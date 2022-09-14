import { getCmsData } from 'svelte-git-cms';
import { getCurrentRepo } from '$lib/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    let repo = getCurrentRepo(url)
    const { posts } = await getCmsData(repo)
    const body = sitemap(url, posts);

    return new Response(body, {
      headers: {
        'Cache-Control': `max-age=0, s-maxage=${3600}`,
        'Content-Type': 'application/xml'
      }
    });
}

const sitemap = (
  /** @type {URL} */ url, /** @type {import('svelte-git-cms/types').Post[]} */ posts
  ) => `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
  >
    <url>
      <loc>${url.origin}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    ${posts
			.map((post) =>
		`
    <url>
      <loc>${url.origin}/${post.front_matter.slug}</loc>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>
    `
			)
			.join('')}
  </urlset>`;