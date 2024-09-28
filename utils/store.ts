import { DateRange } from "react-day-picker";
import { Booking } from "./types";
import { create } from "zustand";

type PropertyState = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  range: DateRange | undefined;
};

export const useProperty = create<PropertyState>(() => {
  return {
    propertyId: "",
    price: 0,
    bookings: [],
    range: undefined,
  };
});
