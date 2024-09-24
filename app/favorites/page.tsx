import EmptyList from "@/components/home/EmptyList";
import PropertiesLists from "@/components/home/PropertiesLists";
import { fetchFavorites } from "@/lib/action";
import React from "react";

export const metadata = {
  title: "favorites",
};

export default async function Page() {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList />;
  }

  return <PropertiesLists properties={favorites} />;
}
