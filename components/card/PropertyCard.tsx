import React from "react";
import { PropertyCardProps } from "@/utils/types";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formats";
import PropertyRatings from "./PropertyRatings";
import FavoriteToggleButton from "./FavoriteToggleButton";
import CountryFlagandName from "./CountryFlagandName";

const PropertyCard = ({ property }: { property: PropertyCardProps }) => {
  const { name, image, price, country } = property;
  const { id: propertyId, tagline } = property;

  return (
    <article className="group relative">
      <Link href={`/properties/${propertyId}`}>
        <div className="relative mb-2 overflow-hidden rounded-md h-[300px]">
          <Image
            src={image}
            fill
            sizes="(max-width:768px) 100vw 50vw"
            alt={name}
            className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold mt-1">
            {name.substring(0, 30)}
          </h3>
          <PropertyRatings inPage={false} propertyId={propertyId} />
        </div>

        <p className="text-sm text-muted-foreground mt-1">
          {tagline.substring(0, 40)}
        </p>

        <div className="flex items-center justify-between mt-1">
          <p className="text-sm mt-1">
            <span className="font-semibold">{formatCurrency(price)}</span>
            night
          </p>
          {/* country and flag */}
          <CountryFlagandName countryCode={country} />
        </div>
      </Link>

      <div className="absolute top-5 right-5 z-5">
        <FavoriteToggleButton propertyId={propertyId} />
      </div>
    </article>
  );
};

export default PropertyCard;
