import React from "react";

import { auth } from "@clerk/nextjs/server";
import { CardSignInButton } from "../form/Button";
import { getFavoriteId } from "@/lib/actions/favorites/favorite-action";
import FavoriteToggleForm from "./FavoriteToggleForm";

const FavoriteToggleButton = async ({ propertyId }: { propertyId: string }) => {
  const { userId } = auth();

  if (!userId) return <CardSignInButton />;
  const favoriteId = await getFavoriteId({ propertyId });

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />;
};

export default FavoriteToggleButton;
