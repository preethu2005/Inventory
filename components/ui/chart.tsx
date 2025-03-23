import * as React from "react"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return (
    <div className="space-y-2" ref={ref} {...props}>
      {props.children}
    </div>
  )
})
Chart.displayName = "Chart"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="overflow-x-auto" ref={ref} {...props}>
        {props.children}
      </div>
    )
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} {...props} />
  },
)
ChartTooltip.displayName = "ChartTooltip"

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className="rounded-md border bg-popover p-4 text-popover-foreground shadow-sm outline-none"
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartTooltipItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  color: string
}

const ChartTooltipItem = React.forwardRef<HTMLDivElement, ChartTooltipItemProps>(
  ({ className, label, value, color, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-2" ref={ref} {...props}>
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-xs font-medium">{label}:</span>
        <span className="text-xs">{value}</span>
      </div>
    )
  },
)
ChartTooltipItem.displayName = "ChartTooltipItem"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground" ref={ref} {...props}>
        {props.children}
      </div>
    )
  },
)
ChartLegend.displayName = "ChartLegend"

export { Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartTooltipItem, ChartLegend }

