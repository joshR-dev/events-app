/**
 * To keep the worker bundle size small, only load
 * the Studio and its configuration in the client
 */
import {
  defineStudioConfig,
  type SingleWorkspace,
  Studio,
  type StudioProps,
} from 'studio'

/**
 * Prevent a consumer from importing into a worker/server bundle.
 */
if (typeof document === 'undefined') {
  throw new TypeError(
    'Sanity Studio can only run in the browser. Please check that this file is not being imported into a worker or server bundle.',
  )
}

type SanityStudioProps = Omit<StudioProps, 'config'> &
  Pick<SingleWorkspace, 'basePath' | 'dataset' | 'projectId'>

export function SanityStudio(props: SanityStudioProps) {
  const {basePath, dataset, projectId, ...rest} = props

  const config = defineStudioConfig({
    basePath,
    dataset,
    projectId,
  })

  return (
    <div data-ui="StudioLayout" id="sanity">
      <Studio {...rest} config={config} unstable_globalStyles />
    </div>
  )
}
