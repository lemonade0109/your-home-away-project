import ChartContainer from "@/components/admin/ChartContainer";
import StatusLoadingContainer, {
  ChartsLoadingContainer,
} from "@/components/admin/Loading";
import StatusContainer from "@/components/admin/StatusContainer";
import React, { Suspense } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<StatusLoadingContainer />}>
        <StatusContainer />

        <Suspense fallback={<ChartsLoadingContainer />}>
          <ChartContainer />
        </Suspense>
      </Suspense>
    </>
  );
}
