from sklearn.linear_model import LinearRegression  # Better for small datasets
from sklearn.ensemble import GradientBoostingRegressor

def predict_sales(data):
    """Train and apply ML models for sales prediction."""
    if data.empty:
        print("⚠️ No valid sales data found. Skipping prediction.")
        return pd.DataFrame(), 0, 0

    last_date = data['sale_date'].max()
    if pd.isna(last_date):
        print("⚠️ No valid dates found in data. Skipping prediction.")
        return pd.DataFrame(), 0, 0

    # Define future months for prediction
    future_months = pd.date_range(start=last_date + pd.DateOffset(months=1), periods=2, freq='ME')
    future_months = future_months.to_period('M').astype(str)

    products = data['product_name'].unique()
    all_predictions = pd.DataFrame()

    actual_values_quantity, predicted_values_quantity = [], []
    actual_values_profit, predicted_values_profit = [], []

    for product in products:
        product_data = data[data['product_name'] == product]

        # Aggregate sales data on a monthly basis
        monthly_data = product_data.groupby('month_year').agg({'quantity_sold': 'sum', 'profit': 'sum'}).reset_index()
        monthly_data['time_index'] = np.arange(len(monthly_data))
        
        # Add new time-based features
        monthly_data['month'] = pd.to_datetime(monthly_data['month_year']).dt.month
        monthly_data['quarter'] = pd.to_datetime(monthly_data['month_year']).dt.quarter

        if monthly_data.empty:
            continue  # Skip this product if no valid data

        X = monthly_data[['time_index', 'month', 'quarter']]  # Add time-based features
        y_quantity = monthly_data['quantity_sold']
        y_profit = monthly_data['profit']

        # Use a small number of splits to avoid errors for small datasets
        n_splits = min(5, len(y_quantity))  
        kf = KFold(n_splits=n_splits, shuffle=True, random_state=42) 

        for train_index, test_index in kf.split(X):
            X_train, X_test = X.iloc[train_index], X.iloc[test_index]
            y_train_quantity, y_test_quantity = y_quantity.iloc[train_index], y_quantity.iloc[test_index]
            y_train_profit, y_test_profit = y_profit.iloc[train_index], y_profit.iloc[test_index]

            # Use Gradient Boosting instead of Random Forest for better time-series modeling
            quantity_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
            quantity_model.fit(X_train, y_train_quantity)
            y_pred_quantity = quantity_model.predict(X_test)
            actual_values_quantity.extend(y_test_quantity)
            predicted_values_quantity.extend(y_pred_quantity)

            profit_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
            profit_model.fit(X_train, y_train_profit)
            y_pred_profit = profit_model.predict(X_test)
            actual_values_profit.extend(y_test_profit)
            predicted_values_profit.extend(y_pred_profit)

        # Predict future sales and profit
        future_indices = np.arange(len(monthly_data), len(monthly_data) + len(future_months))
        future_data = pd.DataFrame({
            'time_index': future_indices,
            'month': pd.to_datetime(future_months).month,
            'quarter': pd.to_datetime(future_months).quarter
        })

        future_quantity = quantity_model.predict(future_data)
        future_profit = profit_model.predict(future_data)

        # Append future predictions
        future_predictions = pd.DataFrame({
            'month_year': future_months,
            'quantity_sold': future_quantity,
            'profit': future_profit,
            'product_name': product
        })

        all_predictions = pd.concat([all_predictions, future_predictions], ignore_index=True)

    # Compute accuracy metrics safely
    quantity_mse = mean_squared_error(actual_values_quantity, predicted_values_quantity) if actual_values_quantity else 0
    profit_mse = mean_squared_error(actual_values_profit, predicted_values_profit) if actual_values_profit else 0
    quantity_accuracy = 100 - (quantity_mse / np.mean(actual_values_quantity) * 100) if actual_values_quantity else 0
    profit_accuracy = 100 - (profit_mse / np.mean(actual_values_profit) * 100) if actual_values_profit else 0

    return all_predictions, quantity_accuracy, profit_accuracy
