import React from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import styles from "./MonthlyTrendsChart.module.css";

const MonthlyTrendsChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer className={styles.chartWrapper}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
          <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="wetWaste" fill="hsl(var(--chart-1))" name="Wet Waste (kg)" />
          <Bar yAxisId="left" dataKey="plasticWaste" fill="hsl(var(--chart-2))" name="Plastic Waste (items)" />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="biogas"
            stroke="hsl(var(--chart-3))"
            strokeWidth={3}
            name="Biogas (meals)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ecoBricks"
            stroke="hsl(var(--chart-4))"
            strokeWidth={3}
            name="Eco-bricks"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendsChart;
