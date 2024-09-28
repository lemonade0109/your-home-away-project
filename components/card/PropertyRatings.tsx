import { fetchPropertyByRating } from "@/lib/action";
import React from "react";
import { FaStar } from "react-icons/fa";

const PropertyRatings = async ({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) => {
  const { rating, count } = await fetchPropertyByRating(propertyId);
  if (count === 0) return null;

  const className = `flex items-center gap-1 ${inPage ? "text-md" : "text-xs"}`;
  const countText = count > 1 ? "reviews" : "review";
  const countValue = `(${count}) ${inPage ? countText : " "} `;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
};

export default PropertyRatings;
