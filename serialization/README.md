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

1. Push all additional content types:

   ```bash
   npm run push:additional-types
   ```

2. Push all corresponding content items of the additional content types:

   ```bash
   npm run push:additional-items
   ```

## Publishing Content Hub ONE assets

You can publish all of your content items to the delivery endpoint using a single command:

```bash
npm run publish:items
```

## Pulling serialized assets from Content Hub ONE

After making changes to content types or content items in Content Hub ONE, you should pull the changes and commit them:

1. Pull all content types:

   ```bash
   npm run pull:types
   ```

1. Pull all content items:

   ```bash
   npm run pull:items
   ```

1. Pull all media items:

   ```bash
   npm run pull:media
   ```

1. Pull all additional content types:

   ```bash
   npm run pull:additional-types
   ```

1. Pull all additional content items:

   ```bash
   npm run pull:additional-items
   ```

## Starting with an empty Content Hub ONE instance

When starting with a completely empty Content Hub ONE instance you need to follow these steps in order to get a functional site:

1. Push all media:

   ```bash
   npm run push:media
   ```

2. Push all content types:

   ```bash
   npm run push:types
   ```

3. Push all content items:

   ```bash
   npm run push:items
   ```

4. Push all content items once more in order to make sure all referenced items are populated correctly:

   ```bash
   npm run push:items
   ```

5. Publish all media:

   ```bash
   npm run publish:all-media
   ```

6. Publish all items:

   ```bash
   npm run publish:items
   ```
