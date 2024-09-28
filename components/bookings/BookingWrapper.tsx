"use client";

import { useProperty } from "@/utils/store";
import { Booking } from "@/utils/types";
import React, { Fragment, useEffect } from "react";
import BookingCalender from "./BookingCalender";
import BookingContainer from "./BookingContainer";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};

const BookingWrapper = ({
  propertyId,
  price,
  bookings,
}: BookingWrapperProps) => {
  useEffect(() => {
    useProperty.setState({
      propertyId,
      price,
      bookings,
    });
  });

  return (
    <Fragment>
      <BookingCalender />
      <BookingContainer />
    </Fragment>
  );
};

export default BookingWrapper;
