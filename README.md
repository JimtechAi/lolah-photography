This is a Next.js 16 site for Lolah Photography.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Booking Form Email Setup

Create a `.env.local` file with these values before testing live submissions:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=Lolah Photography <bookings@yourdomain.com>
RESEND_TO_EMAIL=booklolahphotography@gmail.com
```

Notes:

- `RESEND_FROM_EMAIL` must be a sender verified in Resend for production delivery.
- `NEXT_PUBLIC_SITE_URL` is used for metadata, sitemap, robots, and structured data.
- The booking form posts to `/api/bookings` and forwards requests to Resend.
- If the environment variables are missing, the form will return a configuration error instead of silently failing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
