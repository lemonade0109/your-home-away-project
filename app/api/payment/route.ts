import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest, type NextResponse } from "next/server";
import db from "@/db/db";
import { formatDate } from "@/utils/formats";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const requestHeaders = new Headers(req.headers);
  const origin =
    requestHeaders.get("origin") ||
    process.env.NEXT_PUBLIC_WEBSITE_URL ||
    "http://localhost:3000";

  const { bookingId } = await req.json();

  if (!bookingId) {
    return Response.json(
      { error: "Booking ID is required" },
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  if (!booking) {
    return Response.json(
      { error: "Booking not found" },
      {
        status: 404,
        statusText: "Not Found",
      }
    );
  }
  const {
    totalNights,
    orderTotal,
    checkIn,
    checkOut,
    property: { image, name },
  } = booking;

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { bookingId: booking.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${name}`,
              images: [image],
              description: `Stay in this wonderful place for ${totalNights} nights, from ${formatDate(
                checkIn
              )} to ${formatDate(checkOut)}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session.client_secret) {
      return Response.json(
        { error: "Failed to generate client secret" },
        { status: 500 }
      );
    }

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return Response.json(
      { error: errorMessage },
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};
