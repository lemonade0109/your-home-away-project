"use client";

import SubmitButton from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import RatingInput from "@/components/form/RatingInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createReviewAction } from "@/lib/action";
import React, { useState } from "react";

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  return (
    <div className="mt-8">
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        Leave a review
      </Button>

      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="your thoughts on this property"
              defaultValue="Amazing place !!!"
            />
            <SubmitButton text="Submit" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
