import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'r1ojrcqs',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
   typegen: {
    path: '../storefront/app/**/*.{ts,tsx,js,jsx}',
    schema: './schema.json',
    generates: '../storefront/app/lib/sanity/sanity.types.ts',
  },
})
