import {q} from "../groqd-client";

export const getProductBySlugQuery = q
 .parameters<{
    slug: string
  }>()
  .star
  .filterByType('product')
  .filterBy('store.slug.current == $slug')
  .slice(0)
  .project(sub => ({
    title: sub.field('store.title'),
  }));
