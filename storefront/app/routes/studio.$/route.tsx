import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from 'react-router'

import {invariantResponse} from '@epic-web/invariant'
import {useNonce} from '@shopify/hydrogen'
import {lazy, type ReactNode, Suspense} from 'react'
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'
import {ClientOnly} from 'remix-utils/client-only'

import studioStyles from './studio.css?url'

/**
 * This is a standalone root component for the Sanity Studio route.
 * It does not inherit the main app's root layout or styles.
 * Only available in development mode via the /studio/* route.
 */


export type StudioRouteLoader = {
  basePath: string
  dataset: string
  projectId: string
}

export const meta: MetaFunction = () => [
  {
    content: 'width=device-width,initial-scale=1,viewport-fit=cover',
    name: 'viewport',
  },
  {
    content: 'same-origin',
    name: 'referrer',
  },
  {
    content: 'noindex',
    name: 'robots',
  },
]

/**
 * Prevent Studio from being cached
 */
export const headers: HeadersFunction = () => {
  return {
    'Cache-Control': 'no-store',
  }
}

export const links: LinksFunction = () => {
  return [{href: studioStyles, rel: 'stylesheet'}]
}

export async function loader({
  context,
  request,
}: LoaderFunctionArgs): Promise<StudioRouteLoader> {
  const {env} = context
  const projectId = env.SANITY_PROJECT_ID
  const dataset = env.SANITY_DATASET



  invariantResponse(
    projectId,
    'SANITY_PROJECT_ID environment variable is not set',
    {status: 500},
  )
  invariantResponse(dataset, 'SANITY_DATASET environment variable is not set', {
    status: 500,
  })

    return {
    basePath: "/studio",
    dataset,
    projectId,
  }
}

/**
 * Provide a consistent fallback to prevent hydration mismatch errors.
 */
function SanityStudioFallback(): ReactNode {
  return <></>
}

/**
 * If server-side rendering, then return the fallback instead of the heavy dependency.
 * @see https://remix.run/docs/en/1.14.3/guides/constraints#browser-only-code-on-the-server
 */
const SanityStudio =
  typeof document === 'undefined'
    ? SanityStudioFallback
    : lazy(() =>
        import('./sanity-studio.client').then((module) => ({
          default: module.SanityStudio,
        })),
      )

export default function StudioRoot() {
  const nonce = useNonce()
  const {basePath, dataset, projectId} = useLoaderData<StudioRouteLoader>()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientOnly>
          {() => (
            <Suspense fallback={<SanityStudioFallback />}>
              <SanityStudio
                basePath={basePath}
                dataset={dataset}
                projectId={projectId}
              />
            </Suspense>
          )}
        </ClientOnly>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  )
}
