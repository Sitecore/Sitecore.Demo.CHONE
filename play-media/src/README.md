# PLAY! Media Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

Follow the instructions listed [here](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html) in order to install the CLI.

1. Run the following command in order to add your Content Hub ONE instance to the CLI:

```bash
npm run tenant:add -- -o <organization-id> -t <tenant-id> -ci <client-id> -cs <client-secret>
```

1. Then, run the following command in order to push all content types to your Content Hub ONE instance:

```bash
npm run ser:push-content-types
```

1. Then, run the following command in order to push all content items to your Content Hub ONE instance:

```bash
npm run ser:push-content-items
```

After successfully completing all of the above, you are ready to publish your content items.

```bash
npm run publish-all-items
```
