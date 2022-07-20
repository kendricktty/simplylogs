import React from "react";
import "./chart.css";
import { PieChart, Pie, ResponsiveContainer, Legend, Cell } from "recharts";
import "./MyPieChart.css";
import axios from "../../../axios/axios"
export default function MyPieChart() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 500 },
    { name: "Group F", value: 700 },
  ];
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "FFFFFF",
    "F7B7A3",
    "F44336",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      </g>
    );
  };

  return (
    <div className="chart">
      <h3 className="chartTitle">Weekly Sales Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <PieChart className="myPieChart" width={1200} height={400}>
          <Legend
            className="pieChartLegend"
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconSize={20}
            iconType="circle"
          />
          <Pie
            data={data}
            dataKey="value"
            cx={"25%"}
            cy={"50%"}
            outerRadius={"100%"}
            fill="#8884d8"
            legendType="rect"
            cursor={"pointer"}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
