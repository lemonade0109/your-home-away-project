import { IconButton } from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import ReviewCard from "@/components/properties/reviews/ReviewCard";
import { deleteReviewAction, fetchPropertyReviewsByUser } from "@/lib/action";
import React from "react";

export const metadata = {
  title: "reviews ",
};

export default async function Page() {
  const reviews = await fetchPropertyReviewsByUser();
  if (reviews.length === 0) return <EmptyList />;

  return (
    <>
      <section>
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };

          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DelelteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

const DelelteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
