import { fetchProperties } from "@/lib/action";
import { PropertyCardProps } from "@/utils/types";
import React from "react";
import EmptyList from "./EmptyList";
import PropertiesLists from "./PropertiesLists";

const PropertiesContainer = async ({
  search,
  category,
}: {
  category?: string;
  search?: string;
}) => {
  const properties: PropertyCardProps[] = await fetchProperties({
    category,
    search,
  });

  if (properties.length === 0) {
    return (
      <EmptyList
        heading="No results"
        message="Try Changing some of your filters."
        btnText="Clear filters"
      />
    );
  }

  return <PropertiesLists properties={properties} />;
};

export default PropertiesContainer;
