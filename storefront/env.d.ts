/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PRIVATE_STOREFRONT_API_TOKEN: string;
    PUBLIC_STOREFRONT_API_VERSION: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    SANITY_PROJECT_ID: string;
    SANITY_DATASET: string;
    SANITY_API_VERSION: string;
  }
}

declare module 'react-router' {
  interface AppLoadContext {
    env: Env;
  }
}
