import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Chart({
  data,
  maxYAxisValue,
  xaxis,
  dataKey,
  gridColor,
  lineColor,
  menu = false,
  tooltip,
}) {
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        height={400}
        margin={{ right: 20, left: 0, top: 20, bottom: 20 }}
      >
        <CartesianGrid stroke={gridColor} strokeDasharray="5 5" />
        <XAxis
          axisLine={{ stroke: "#041b2a" }}
          tick={{ fill: "#041b2a", fontWeight: 500 }}
          dataKey={menu ? "year" : "month"}
          tickFormatter={xaxis}
        />
        <YAxis
          domain={[0, maxYAxisValue]}
          tickCount={maxYAxisValue}
          axisLine={{ stroke: "#041b2a" }}
          tick={{ fill: "#041b2a", fontWeight: 500 }}
        />
        <Line type="monotone" dataKey={dataKey} stroke={lineColor} />
        <Tooltip content={tooltip} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
