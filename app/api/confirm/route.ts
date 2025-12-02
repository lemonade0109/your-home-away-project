import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";

import { NextResponse, type NextRequest } from "next/server";
import db from "@/db/db";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  if (!session_id) {
    return NextResponse.json(
      { error: "Session ID is required" },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const bookingId = session.metadata?.bookingId;

    if (session.payment_status !== "paid" || !bookingId) {
      throw new Error(
        `Payment status: ${session.payment_status}, Booking ID: ${bookingId}`
      );
    }

    await db.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: true },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }

  redirect("/bookings");
};
