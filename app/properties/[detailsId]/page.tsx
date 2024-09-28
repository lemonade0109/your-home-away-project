import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRatings from "@/components/card/PropertyRatings";
import Amenities from "@/components/properties/Amenities";
import Breadcrumbs from "@/components/properties/Breadcrumbs";
import Description from "@/components/properties/Description";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import PropertyReview from "@/components/properties/reviews/PropertyReview";
import SubmitReview from "@/components/properties/reviews/SubmitReview";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchPropertyDetails, findExistingReview } from "@/lib/action";
import { auth } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import React from "react";

//RENDER DYNAMICALLY ONLY TO CLIENT AND NOT SERVER
const DynamicMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

const DynamiBookingWrapper = dynamic(
  () => import("@/components/bookings/BookingWrapper"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  }
);

export default async function Page({
  params,
}: {
  params: { detailsId: string };
}) {
  const property = await fetchPropertyDetails(params.detailsId);
  if (!property) redirect("/");

  const { baths, bedrooms, beds, guests } = property;
  const details = { baths, bedrooms, beds, guests };
  const { firstName, profileImage } = property.profile;

  const { userId } = auth();
  const isNotOwner = property.profile.clerkId !== userId;
  const reviewDoesNotExist =
    userId && isNotOwner && !(await findExistingReview(userId, property.id));

  return (
    <section>
      <Breadcrumbs name={property.name} />
      <header className="capitalize flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold">{property.tagline}</h1>
        <div className="flex items-center gap-x-4">
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </header>

      <ImageContainer mainImage={property.image} name={property.name} />

      <section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
        <div className="lg:col-span-8">
          <div className="flex gap-x-4 items-center">
            <h1 className="text-xl font-bold">{property.name}</h1>
            <PropertyRatings inPage propertyId={property.id} />
          </div>

          <PropertyDetails details={details} />
          <UserInfo profile={{ firstName, profileImage }} />

          <Separator className="mt-4" />

          <Description description={property.description} />
          <Amenities amenities={property.amenities} />
          <DynamicMap countryCode={property.country} />
        </div>

        <div className="lg:col-span-4 flex-col items-center">
          <DynamiBookingWrapper
            propertyId={property.id}
            bookings={property.bookings}
            price={property.price}
          />
        </div>
      </section>

      {reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
      <PropertyReview propertyId={property.id} />
    </section>
  );
}
