"use client";

import { toggleFavoriteAction } from "@/lib/action";
import { usePathname } from "next/navigation";
import React from "react";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Button";

type FavoriteToggleProps = {
  propertyId: string;
  favoriteId: string | null;
};

const FavoriteToggleForm = (props: FavoriteToggleProps) => {
  const { propertyId, favoriteId } = props;

  const pathname = usePathname();
  const toggleAction = toggleFavoriteAction.bind(null, {
    propertyId,
    favoriteId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CardSubmitButton isFavorite={favoriteId ? true : false} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
