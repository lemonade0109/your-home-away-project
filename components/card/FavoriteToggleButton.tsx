import React from "react";

import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Button";
import { fetchFavoriteId } from "@/lib/action";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ propertyId }: { propertyId: string }) => {
  const { userId } = auth();

  if (!userId) return <CardSignInButton />;
  const favoriteId = await fetchFavoriteId({ propertyId });

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
};

export default FavoriteToggleButton;
