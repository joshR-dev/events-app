import {q} from "../groqd-client";

export const getHomeQuery = q
  .star
  .filterByType('home')
  .slice(0)
  .project((sub) => ({
    hero: sub.field('hero'),
    modules: sub.select({
      'defined(modules)': sub.field('modules[]'),
    }),
    seo: sub.field('seo'),
  }));
