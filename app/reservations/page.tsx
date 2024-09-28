import CountryFlagandName from "@/components/card/CountryFlagandName";
import EmptyList from "@/components/home/EmptyList";
import Stats from "@/components/reservations/Stats";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchReservations } from "@/lib/action";
import { formatCurrency, formatDate } from "@/utils/formats";
import Link from "next/link";

import React from "react";

export default async function page() {
  const reservations = await fetchReservations();
  if (reservations.length === 0) return <EmptyList />;

  return (
    <>
      <Stats />

      <div className="mt-16">
        <h4 className="mb-4 capitalize">
          total reservations : {reservations.length}
        </h4>

        <Table>
          <TableCaption>A list of recent reservations</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reservations.map((reservation) => {
              const { id, orderTotal, totalNights, checkIn, checkOut } =
                reservation;
              const { id: propertyId, name, country } = reservation.property;

              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link href={`/properties/${propertyId}`}>{name}</Link>
                  </TableCell>

                  <TableCell>
                    <CountryFlagandName countryCode={country} />
                  </TableCell>

                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
