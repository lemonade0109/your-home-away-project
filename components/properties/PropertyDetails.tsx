import { formatQuantity } from "@/utils/formats";
import React from "react";

type PropertyDetailsProps = {
  details: {
    bedrooms: number;
    baths: number;
    guests: number;
    beds: number;
  };
};

const PropertyDetails = (props: PropertyDetailsProps) => {
  const {
    details: { bedrooms, baths, guests, beds },
  } = props;

  return (
    <p className="text-md font-light ">
      <span>{formatQuantity(bedrooms, "bedroom")} &middot; </span>
      <span>{formatQuantity(baths, "bath")} &middot; </span>
      <span>{formatQuantity(guests, "guest")} &middot; </span>
      <span>{formatQuantity(beds, "bed")}</span>
    </p>
  );
};

export default PropertyDetails;
