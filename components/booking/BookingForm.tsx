"use client";

import { FormEvent, useState } from "react";
import {
  initialBookingFormData,
  type BookingFormData,
  weddingTypes,
} from "@/types/booking";

type BookingFormProps = {
  eyebrow?: string;
  title?: string;
  submitLabel?: string;
  successMessage?: string;
  showWhatsappLink?: boolean;
};

export default function BookingForm({
  eyebrow = "Book Session",
  title = "Request your date",
  submitLabel = "Send Booking",
  successMessage = "Thank you for contacting Lolah Photography. We&apos;ve received your booking request and will get back to you within 24 hours.",
  showWhatsappLink = true,
}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(initialBookingFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;

        throw new Error(
          payload?.error ||
            "Your booking request could not be sent. Please try again."
        );
      }

      setIsSubmitted(true);
      setFormData(initialBookingFormData);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Your booking request could not be sent. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-[2rem] border border-yellow-200/15 bg-[#120f0c] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] md:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-yellow-300/85">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-[#fff7ea] md:text-4xl">
            {title}
          </h2>
        </div>

        {showWhatsappLink ? (
          <a
            href="https://wa.me/2348068102500?text=Hello%20Lolah%20Photography.%20I%20would%20like%20to%20book%20a%20wedding%20session."
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-yellow-300/30 px-4 py-2 text-xs uppercase tracking-[0.18em] text-yellow-100 transition hover:bg-yellow-300/10"
          >
            WhatsApp Instead
          </a>
        ) : null}
      </div>

      {isSubmitted ? (
        <div className="rounded-3xl border border-yellow-300/20 bg-yellow-300/10 p-6 text-sm leading-relaxed text-yellow-50">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
          {errorMessage}
        </div>
      ) : null}

      <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <FormField label="First Name" name="brideName" required>
            <input
              id="brideName"
              name="brideName"
              type="text"
              required
              value={formData.brideName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Your first name"
            />
          </FormField>

          <FormField label="Last Name" name="groomName" required>
            <input
              id="groomName"
              name="groomName"
              type="text"
              required
              value={formData.groomName}
              onChange={handleChange}
              className={inputClassName}
              placeholder="Your last name"
            />
          </FormField>

          <FormField label="Email Address" name="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={inputClassName}
              placeholder="you@example.com"
            />
          </FormField>

          <FormField label="Phone Number" name="phoneNumber" required>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className={inputClassName}
              placeholder="+234 800 000 0000"
            />
          </FormField>

          <FormField label="Photography Booking" name="weddingType" required>
            <select
              id="weddingType"
              name="weddingType"
              required
              value={formData.weddingType}
              onChange={handleChange}
              className={inputClassName}
            >
              {weddingTypes.map((weddingType) => (
                <option key={weddingType} value={weddingType}>
                  {weddingType}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Preferred Date" name="weddingDate" required>
            <input
              id="weddingDate"
              name="weddingDate"
              type="date"
              required
              value={formData.weddingDate}
              onChange={handleChange}
              className={inputClassName}
            />
          </FormField>

          <FormField label="Location / Venue" name="eventVenue" required>
            <input
              id="eventVenue"
              name="eventVenue"
              type="text"
              required
              value={formData.eventVenue}
              onChange={handleChange}
              className={inputClassName}
              placeholder="City, venue, or destination"
            />
          </FormField>
        </div>

        <FormField label="Message" name="message" required>
          <textarea
            id="message"
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            className={`${inputClassName} min-h-36 resize-y`}
            placeholder="Tell us about your event, coverage needs, and what matters most to you."
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 inline-flex items-center justify-center rounded-full bg-yellow-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_14px_40px_rgba(234,179,8,0.28)] transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending Booking..." : submitLabel}
        </button>
      </form>
    </section>
  );
}

function FormField({
  children,
  label,
  name,
  required = false,
}: {
  children: React.ReactNode;
  label: string;
  name: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm text-gray-200" htmlFor={name}>
      <span className="uppercase tracking-[0.18em] text-yellow-50/90">
        {label}
        {required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}

const inputClassName =
  "w-full rounded-2xl border border-yellow-200/15 bg-[#1b1713] px-4 py-3 text-base text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-300/60 focus:ring-2 focus:ring-yellow-300/15";