/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    setError(null);

    if (!bookingId) {
      const err = "No booking ID provided";
      setError(err);
      throw new Error(err);
    }

    try {
      const response = await axios.post("/api/payment", {
        bookingId: bookingId,
      });

      if (!response.data.clientSecret) {
        const err = response.data.error || "Failed to create checkout session";
        setError(err);
        throw new Error(err);
      }

      return response.data.clientSecret;
    } catch (error) {
      const errorMsg = axios.isAxiosError(error)
        ? error.response?.data?.error || error.message
        : error instanceof Error
        ? error.message
        : "An unknown error occurred";
      setError(errorMsg);
      throw error;
    }
  }, [bookingId]);

  const options = { fetchClientSecret };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold text-lg mb-2">
            Payment Error
          </h2>
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout" className="max-w-4xl mx-auto p-4">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
