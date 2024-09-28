import { fetchChartsData } from "@/lib/action";
import React from "react";
import Chart from "./Chart";

const ChartContainer = async () => {
  const bookings = await fetchChartsData();

  if (bookings.length < 1) return null;

  return <Chart data={bookings} />;
};

export default ChartContainer;
