This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

## API Configuration

The homepage and article pages fetch published Indonesian content from the API
server-side. Set `API_BASE_URL` to the API origin before starting or building
the application. The app exits with a configuration error if it is missing or
is not a valid HTTP or HTTPS URL.

The contact form reads its subject options and submits messages directly from
the browser. Set `NEXT_PUBLIC_API_BASE_URL` to the same API origin as
`API_BASE_URL`. This public value is included in the browser bundle, so it must
not contain credentials.

Set `SITE_URL` to the public site's HTTP or HTTPS origin, such as
`https://www.example.com`. It must not include a path, credentials, query, or
fragment. The `/robots.txt` and `/sitemap.xml` routes use it to build absolute
URLs and require it at runtime.

## Docker Deployment

Build the production image with both API origins set to the same URL:

```bash
docker build \
  --build-arg API_BASE_URL=https://api.example.com \
  --build-arg NEXT_PUBLIC_API_BASE_URL=https://api.example.com \
  -t pln-emi-landing .
```

Run the container and provide `API_BASE_URL` for server-side API requests and
`SITE_URL` for the public site origin:

```bash
docker run --rm -p 3000:3000 \
  -e API_BASE_URL=https://api.example.com \
  -e SITE_URL=https://www.example.com \
  pln-emi-landing
```

The public API URL is embedded in the browser bundle at build time. The server
API URL must also be set at runtime and should match the build-time value.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
