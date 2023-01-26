# PLAY! Media serialization

## Getting started

1. Ensure you are using nodejs 16.X or newer.
1. Install npm packages:

   ```bash
   npm install
   ```

1. [Install the Content Hub ONE CLI](https://doc.sitecore.com/ch-one/en/developers/content-hub-one/content-hub-one-cli--install-and-run-the-cli.html).

## Connecting a Content Hub ONE instance to the CLI

```bash
npm run tenant:add -- -o <organization-id> -t <tenant-id> -ci <oauth-client-id> -cs <oauth-client-secret>
```

## Pushing serialized assets to Content Hub ONE

1. Push all content types:

   ```bash
   npm run push:types
   ```

1. Push all content items:

   ```bash
   npm run push:items
   ```

## Pushing additional assets to Content Hub ONE (currently ContentBlock and Location)

1. In order to push the additional content types run:

   ```bash
   npm run push:content-block-type
   npm run push:location-type
   ```

1. In order to push the corresponding content items of the additional content types run:

   ```bash
   npm run push:content-block-items
   npm run push:location-items
   ```

## Publishing Content Hub ONE assets

You can publish all of your content items to the delivery endpoint using a single command:

```bash
npm run publish:items
```

## Pulling serialized assets from Content Hub ONE

After making change to content types or content items in Content Hub ONE, you should pull the changes and commit them:

1. Pull all content types:

   ```bash
   npm run pull:types
   ```

1. Pull all content items:

   ```bash
   npm run pull:items
   ```

## Removing media fields from serialized assets before pushing to Content Hub ONE

Currently the Content Hub ONE CLI does not allow media serialization, therefore you should first remove these fields from the content items.

You can do so using a single command:

```bash
npm run remove-media-fields
```
