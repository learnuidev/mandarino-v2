# Development Setup

## Getting Started

To run this application:

```bash
npm install
npm run start
```

## Building For Production

To build this application for production:

```bash
npm run build
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Environment Variables

### T3Env

- You can use T3Env to add type safety to your environment variables.
- Add Environment variables to the `src/env.ts` file.
- Use the environment variables in your code.

#### Usage

```ts
import { env } from "@/env";

console.log(env.VITE_APP_TITLE);
```

## Component Library

### Shadcn

Add components using the latest version of [Shadcn](https://ui.shadcn.com/).

```bash
pnpx shadcn@latest add button
```

## Demo Files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

## Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).
