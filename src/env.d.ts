/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PRODUCT_API: string;
  readonly VITE_STRIPE_CHECKOUT_API: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
