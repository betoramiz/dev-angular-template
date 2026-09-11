/**
 * Single source of truth for runtime environment configuration.
 *
 * Edit ONLY this file to add, rename or remove an environment variable.
 * Then run `npm run generate-env` (also runs automatically on `prestart` /
 * `prebuild`). The generator rewrites, from this manifest:
 *
 *   - src/assets/environment.json           -> values used by `ng serve` / local build
 *   - src/assets/environment.template.json  -> `${VAR}` placeholders substituted at
 *                                              container start by entrypoint.sh
 *   - src/assets/environment.envsubst.vars  -> whitelist consumed by `envsubst` in entrypoint.sh
 *
 * The Zod schema in src/app/shared/models/environment-config.ts stays the
 * authoritative validator; the generator cross-checks that its keys match the
 * entries below and fails if they drift.
 *
 * Entry fields:
 *   key        (required) property name in environment.json (must match the Zod schema)
 *   envVar     (required) OS environment variable read at container runtime / build time
 *   devDefault (required) value written to environment.json when the env var is not set
 *   required   (optional, default true) informational;
 */

/** @typedef {{ key: string, envVar: string, devDefault: string, required?: boolean }} EnvVarEntry */

/** @type {EnvVarEntry[]} */
export const environmentManifest = [
  {
    key: 'apiUrl',
    envVar: 'ECOMMERCE_API_URL',
    devDefault: 'http://localhost:5255/api/public',
    required: true,
  },
  {
    key: 'stripePublishableKey',
    envVar: 'STRIPE_PUBLISHABLE_KEY',
    devDefault:
      'pk_test_51TgwNaRtMXu32zWYQ2PZlP8v767QSgtJKEofmn7EgHymrQWmWlGzKJSE2crPQcgnviKsLwYPNbdueRJc91VqdHEG00xUeqe0TC',
    required: true,
  },
  {
    key: 'whatsappClientSupportNumber',
    envVar: 'WHATSAPP_CLIENT_SUPPORT',
    devDefault: '6122894780',
    required: true,
  },
  {
    key: 'whatsappClientSupportMessage',
    envVar: 'WHATSAPP_CLIENT_SUPPORT_MESSAGE',
    devDefault: 'Hola! quiero más información antes de comprar',
    required: true,
  },
  {
    key: 'analyticsEnabled',
    envVar: 'ANALYTICS_ENABLED',
    devDefault: 'false',
    required: true,
  },
  {
    key: 'gaMeasurementId',
    envVar: 'GA_MEASUREMENT_ID',
    devDefault: 'G-GCL1T4Y50J',
    required: true,
  }
];
