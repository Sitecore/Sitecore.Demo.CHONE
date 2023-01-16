# PLAY! Media Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

1. Ensure you are using nodejs 16.X or newer.
1. Install npm packages:

   ```bash
   npm install
   ```

1. Create your `.env` file from the `.env.template` file.
1. In your `.env` file, enter your API key and API URL.
1. Run the development server:

   ```bash
   npm run dev
   ```

1. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the Content Hub ONE CLI

To install the CLI, follow the [official instructions](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html).

### Connecting a Content Hub ONE instance to the CLI

```bash
npm run tenant:add -- -o <organization-id> -t <tenant-id> -ci <oauth-client-id> -cs <oauth-client-secret>
```

### Pushing serialized assets to Content Hub ONE

1. Push all content types:

   ```bash
   npm run ser:push-content-types
   ```

1. Push all content items:

   ```bash
   npm run ser:push-content-items
   ```

### Publishing Content Hub ONE assets

You can publish all of your content items to the delivery endpoint using a single command:

```bash
npm run publish-all-items
```
