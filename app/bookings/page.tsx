import CountryFlagandName from "@/components/card/CountryFlagandName";
import { IconButton } from "@/components/form/Button";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteBookingsAction, fetchBookings } from "@/lib/action";
import { formatCurrency, formatDate } from "@/utils/formats";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "bookings",
};

export default async function Page() {
  const bookings = await fetchBookings();
  if (bookings.length === 0) return <EmptyList />;

  return (
    <div className="mt-16">
      <h4 className="mb-4 capitalize">total bookings</h4>

      <Table>
        <TableCaption>
          A list of your recent bookings: {bookings.length}
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Property Name</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Nights</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {bookings.map((booking) => {
            const { id, orderTotal, totalNights, checkIn, checkOut } = booking;
            const { id: propertyId, name, country } = booking.property;

            const startDate = formatDate(checkIn);
            const endDate = formatDate(checkOut);

            return (
              <TableRow key={id}>
                <TableCell>
                  <Link
                    href={`/properties/${propertyId}`}
                    className="underline text-muted-foreground tracking-wide"
                  >
                    {name}
                  </Link>
                </TableCell>

                <TableCell>
                  <CountryFlagandName countryCode={country} />
                </TableCell>

                <TableCell>{totalNights}</TableCell>

                <TableCell>{formatCurrency(orderTotal)}</TableCell>

                <TableCell>{startDate}</TableCell>
                <TableCell>{endDate}</TableCell>

                <TableCell>
                  <DeleteBooking bookingId={id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

const DeleteBooking = ({ bookingId }: { bookingId: string }) => {
  const deleteBooking = deleteBookingsAction.bind(null, { bookingId });

  return (
    <FormContainer action={deleteBooking}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
