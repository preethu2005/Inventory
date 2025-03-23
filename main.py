from flask import Flask, render_template
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import matplotlib
matplotlib.use('Agg')
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
import io
import base64
import threading

# Initialize Flask app
app = Flask(__name__)

# Database connection details (Replace with actual credentials)
db_username = "root"
db_password = "1234"
db_host = "localhost"
db_port = "3306"
db_name = "inventory_db"

# Create SQLAlchemy database connection
engine = create_engine(f"mysql+pymysql://{db_username}:{db_password}@{db_host}:{db_port}/{db_name}")
def start_gui():
    import tkinter as tk
    root = tk.Tk()
    root.mainloop()

def fetch_data():
    """Fetch and preprocess sales data from the database."""
    query = "SELECT * FROM ProductSales;"
    data = pd.read_sql(query, engine)

    # Ensure 'sale_date' is in datetime format
    data['sale_date'] = pd.to_datetime(data['sale_date'])

    # Calculate additional features
    data['revenue'] = data['selling_price'] * data['quantity_sold']
    data['profit'] = data['revenue'] - (data['cost_price'] * data['quantity_sold'])
    data['month_year'] = data['sale_date'].dt.to_period('M').astype(str)

    return data

def predict_sales(data):
    """Train and apply Linear Regression model for sales prediction."""
    if data.empty:
        print("⚠️ No valid sales data available.")
        return pd.DataFrame(), 0, 0

    last_date = data['sale_date'].max()
    future_months = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=3, freq='M')
    future_months = future_months.to_period('M').astype(str)

    products = data['product_name'].unique()
    all_predictions = pd.DataFrame()

    actual_quantity, predicted_quantity = [], []
    actual_profit, predicted_profit = [], []

    for product in products:
        product_data = data[data['product_name'] == product]
        monthly_data = product_data.groupby('month_year').agg({'quantity_sold': 'sum', 'profit': 'sum'}).reset_index()
        monthly_data['time_index'] = np.arange(len(monthly_data))

        if len(monthly_data) < 2:
            continue  # Skip if there's not enough data

        X = monthly_data[['time_index']]
        y_quantity = monthly_data['quantity_sold']
        y_profit = monthly_data['profit']

        # Train models
        quantity_model = LinearRegression()
        quantity_model.fit(X, y_quantity)
        y_quantity_pred = quantity_model.predict(X)

        profit_model = LinearRegression()
        profit_model.fit(X, y_profit)
        y_profit_pred = profit_model.predict(X)

        actual_quantity.extend(y_quantity)
        predicted_quantity.extend(y_quantity_pred)

        actual_profit.extend(y_profit)
        predicted_profit.extend(y_profit_pred)

        # Predict for future months
        future_indices = np.arange(len(monthly_data), len(monthly_data) + len(future_months)).reshape(-1, 1)
        future_quantity = quantity_model.predict(future_indices)
        future_profit = profit_model.predict(future_indices)

        future_data = pd.DataFrame({
            'month_year': future_months,
            'quantity_sold': future_quantity,
            'profit': future_profit,
            'product_name': product
        })
        all_predictions = pd.concat([all_predictions, future_data], ignore_index=True)

    # Calculate accuracy
    quantity_mse = mean_squared_error(actual_quantity, predicted_quantity) if actual_quantity else 0
    profit_mse = mean_squared_error(actual_profit, predicted_profit) if actual_profit else 0

    quantity_accuracy = 100 - (quantity_mse / np.mean(actual_quantity) * 100) if actual_quantity else 0
    profit_accuracy = 100 - (profit_mse / np.mean(actual_profit) * 100) if actual_profit else 0

    return all_predictions, round(quantity_accuracy, 2), round(profit_accuracy, 2)

def plot_graph(data, column, ylabel, title):
    """Generate a plot for sales trends."""
    plt.figure(figsize=(12, 6))

    for product in data['product_name'].unique():
        product_data = data[data['product_name'] == product]
        plt.plot(product_data['month_year'], product_data[column], marker='o', label=product)

    plt.title(title)
    plt.xlabel("Month-Year")
    plt.ylabel(ylabel)
    plt.legend()
    plt.grid(True)
    plt.xticks(rotation=45)

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    plt.close()
    return plot_url

@app.route('/')
def index():
    """Render the main page with sales trends and predictions."""
    data = fetch_data()
    predictions, quantity_accuracy, profit_accuracy = predict_sales(data)

    quantity_plot = plot_graph(predictions, 'quantity_sold', 'Quantity Sold', 'Monthly Sales Predictions')
    profit_plot = plot_graph(predictions, 'profit', 'Profit', 'Monthly Profit Predictions')

    return render_template(
        'index.html', 
        table_data=data.to_dict(orient='records'),
        quantity_plot=quantity_plot,
        profit_plot=profit_plot,
        quantity_accuracy=quantity_accuracy,
        profit_accuracy=profit_accuracy
    )

if __name__ == '__main__':
    plt.figure(figsize=(12, 6))
    threading.Thread(target=start_gui).start()
    app.run(debug=True)
