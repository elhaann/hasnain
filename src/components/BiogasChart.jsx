import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import styles from "./BiogasChart.module.css";

const BiogasChart = ({ data }) => {
  return (
    <div className={styles.chartContainer}>
      <ResponsiveContainer className={styles.chartWrapper}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
              color: "hsl(var(--card-foreground))",
            }}
          />
          <Line
            type="monotone"
            dataKey="biogas"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BiogasChart;
