import {colorInput} from '@sanity/color-input'
import {visionTool} from '@sanity/vision'
import {defineConfig, type SingleWorkspace} from 'sanity'
import {imageHotspotArrayPlugin} from 'sanity-plugin-hotspot-array'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import {structureTool} from 'sanity/structure'

import {customDocumentActions} from './plugins/customDocumentActions'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export {Studio} from 'sanity'
export type {SingleWorkspace, StudioProps} from 'sanity'

/**
 * Configuration options that will be passed in
 * from the environment or application
 */
type SanityConfig = Pick<
  SingleWorkspace,
  'basePath' | 'dataset' | 'projectId' | 'title'
>

/**
 * Prevent a consumer from importing into a worker/server bundle.
 */
if (typeof document === 'undefined') {
  throw new TypeError(
    'Sanity Studio can only run in the browser. Please check that this file is not being imported into a worker or server bundle.',
  )
}

/**
 * Wrap whatever Sanity Studio configuration your project requires.
 */
export function defineStudioConfig(config: SanityConfig) {
  return defineConfig({
    ...config,

    name: 'default',
    plugins: [
      structureTool({structure}),
      visionTool(),
      colorInput(),
      imageHotspotArrayPlugin(),
      customDocumentActions(),
      media(),
    ],

    schema: {
      types: schemaTypes,
    },

    form: {
      file: {
        assetSources: (previousAssetSources) => {
          return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
        },
      },
      image: {
        assetSources: (previousAssetSources) => {
          return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
        },
      },
    },

    title: config.title || 'berg-events',
  })
}
