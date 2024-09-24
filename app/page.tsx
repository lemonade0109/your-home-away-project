import LoadingCard from "@/components/card/LoadingCard";
import CategoriesLists from "@/components/home/CategoriesLists";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <section>
      <CategoriesLists
        category={searchParams.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCard />}>
        <PropertiesContainer
          category={searchParams.category}
          search={searchParams.search}
        />
      </Suspense>
    </section>
  );
}
