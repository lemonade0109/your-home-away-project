import { fetchReservationStats } from "@/lib/action";
import React from "react";
import StatusCard from "../admin/StatusCard";
import { formatCurrency } from "@/utils/formats";

const Stats = async () => {
  const stats = await fetchReservationStats();

  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatusCard title="properties" value={stats.properties} />
      <StatusCard title="nights" value={stats.nights} />
      <StatusCard title="amount" value={formatCurrency(stats.amount)} />
    </div>
  );
};

export default Stats;
