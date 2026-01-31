import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/route';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {ProductItem} from '~/components/product/product-item';
import { runQuery } from '~/lib/sanity/groqd-client';
import { getProductBySlugQuery } from '~/lib/sanity/product/queries';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const product = await runQuery(getProductBySlugQuery, {parameters: {slug: "test-tshirt-product"}});

  return {
    product
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const {product} = data;
  return (
    <div className="home">
      {product?.title}
    </div>
  );
}
