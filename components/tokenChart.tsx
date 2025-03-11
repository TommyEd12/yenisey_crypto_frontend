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

const chartConfig = {
  volume: {
    label: "Объем",
    color: "#2563eb",
  },
  countOps: {
    label: "Операции",
    color: "#7e22ce",
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
      setTokenInfo(tokenData.slice(-60));
    };
    fetchData();
  }, []);

  return (
    <div className="w-8/12 flex items-center max-h-screen h-screen">
      <ChartContainer
        config={chartConfig}
        className="min-h-[200px] h-full w-full"
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
          <Bar
            activeBar={true}
            dataKey="countOps"
            fill="var(--color-operations)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
