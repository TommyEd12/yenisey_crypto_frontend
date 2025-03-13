"use client";
import { backendInstance } from "@/http";
import { tokenData } from "@/types";
import React, { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

interface tokenChartProps {
  props: { tokenAddress: string };
}

const chartConfigOps = {
  countOps: {
    label: "Операции",
    color: "#7e22ce",
  },
} satisfies ChartConfig;

const chartConfig = {
  volume: {
    label: "Объем",
    color: "#2563eb",
  },
} satisfies ChartConfig;
export const TokenChart = ({ props }: tokenChartProps) => {
  const [tokenInfo, setTokenInfo] = useState<tokenData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await backendInstance.get(
        `metrics/tokenMetrics?tokenAddress=${props.tokenAddress}`
      );
      const tokenData: tokenData[] = response.data;
      setTokenInfo(tokenData.slice(-100));
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-start max-h-screen h-screen">
      <ChartContainer
        config={chartConfig}
        className="min-h-[100px] h-full w-6/12"
      >
        <BarChart accessibilityLayer data={tokenInfo}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="created"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="volume" fill="var(--color-volume)" radius={1} />
        </BarChart>
      </ChartContainer>
      <ChartContainer
        config={chartConfigOps}
        className="min-h-[100px] h-full w-6/12"
      >
        <BarChart accessibilityLayer data={tokenInfo}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="created"
            tickLine={true}
            tickMargin={10}
            axisLine={true}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="countOps" fill="var(--color-countOps)" radius={1} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
