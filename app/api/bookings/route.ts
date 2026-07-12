import type { BookingFormData } from "@/types/booking";

const resendApiUrl = "https://api.resend.com/emails";
const destinationEmail =
  process.env.RESEND_TO_EMAIL || "booklolahphotography@gmail.com";

type BookingPayload = Partial<BookingFormData>;

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const resendFromEmail = process.env.RESEND_FROM_EMAIL;

    if (!resendApiKey || !resendFromEmail) {
      return Response.json(
        {
          error:
            "Booking email is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL on the server.",
        },
        { status: 500 }
      );
    }

    const body = (await request.json()) as BookingPayload;
    const booking = normalizeBookingPayload(body);

    if (!booking) {
      return Response.json(
        { error: "Please complete all required booking fields." },
        { status: 400 }
      );
    }

    const resendResponse = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFromEmail,
        to: [destinationEmail],
        reply_to: booking.email,
        subject: `New Booking Request: ${booking.brideName} & ${booking.groomName}`,
        text: createPlainTextEmail(booking),
        html: createHtmlEmail(booking),
      }),
    });

    if (!resendResponse.ok) {
      const failure = (await resendResponse.json().catch(() => null)) as
        | { message?: string; error?: string }
        | null;

      return Response.json(
        {
          error:
            failure?.message ||
            failure?.error ||
            "The booking email could not be delivered.",
        },
        { status: 502 }
      );
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch {
    return Response.json(
      { error: "An unexpected error occurred while sending your booking." },
      { status: 500 }
    );
  }
}

function normalizeBookingPayload(body: BookingPayload) {
  const booking = {
    brideName: body.brideName?.trim() || "",
    groomName: body.groomName?.trim() || "",
    email: body.email?.trim() || "",
    phoneNumber: body.phoneNumber?.trim() || "",
    weddingDate: body.weddingDate?.trim() || "",
    eventVenue: body.eventVenue?.trim() || "",
    weddingType: body.weddingType?.trim() || "",
    budget: body.budget?.trim() || "",
    message: body.message?.trim() || "",
  };

  const hasMissingField = Object.values(booking).some((value) => !value);

  return hasMissingField ? null : booking;
}

function createPlainTextEmail(booking: NonNullable<ReturnType<typeof normalizeBookingPayload>>) {
  return [
    "New Booking Request",
    `Bride Name: ${booking.brideName}`,
    `Groom Name: ${booking.groomName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phoneNumber}`,
    `Wedding Date: ${booking.weddingDate}`,
    `Venue: ${booking.eventVenue}`,
    `Wedding Type: ${booking.weddingType}`,
    `Budget: ${booking.budget}`,
    "Message:",
    booking.message,
  ].join("\n");
}

function createHtmlEmail(booking: NonNullable<ReturnType<typeof normalizeBookingPayload>>) {
  const rows = [
    ["Bride Name", booking.brideName],
    ["Groom Name", booking.groomName],
    ["Email", booking.email],
    ["Phone", booking.phoneNumber],
    ["Wedding Date", booking.weddingDate],
    ["Venue", booking.eventVenue],
    ["Wedding Type", booking.weddingType],
    ["Budget", booking.budget],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:10px 12px;font-weight:600;border-bottom:1px solid #e7dcc4;">${label}</td><td style="padding:10px 12px;border-bottom:1px solid #e7dcc4;">${escapeHtml(
          value
        )}</td></tr>`
    )
    .join("");

  return `
    <div style="background:#f5efe5;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#201a14;">
      <div style="max-width:720px;margin:0 auto;background:#fffaf3;border-radius:24px;overflow:hidden;border:1px solid #eadfc9;">
        <div style="padding:28px 32px;background:#17120d;color:#fff4df;">
          <p style="margin:0 0 12px;letter-spacing:0.28em;text-transform:uppercase;font-size:12px;color:#f2cb67;">Lolah Photography</p>
          <h1 style="margin:0;font-size:28px;line-height:1.2;">New Booking Request</h1>
        </div>
        <div style="padding:28px 32px;">
          <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
          <div style="margin-top:24px;">
            <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6d2f;">Message</p>
            <div style="padding:18px 20px;border-radius:18px;background:#f7efe2;white-space:pre-wrap;line-height:1.6;">${escapeHtml(
              booking.message
            )}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}