import { getCmsData } from 'svelte-git-cms';
import { getCurrentRepo } from '$lib/utils';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    let repo = getCurrentRepo(url)
    const { posts } = await getCmsData(repo)
    const body = xml(posts, repo, url)
    return new Response(body, {
      headers: {
        'Cache-Control': `max-age=0, s-maxage=${600}`, // 10 minutes
        'Content-Type': 'application/rss+xml'
      }
    });
}

const xml =
  (
    /** @type {import('svelte-git-cms/types').Post[]} */ posts, /** @type {string} */ repo, /** @type {URL} */ url
  ) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>${repo.split('/')[0]}</title>
    <link>${''}</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
      .map(
        (        /** @type {{ title: any; front_matter: { slug: any; }; created_at: string | number | Date; }} */ post) =>
          `
        <item>
          <title>${post.title}</title>
          <description>A blog built with SvelteKit about tech and stuff!</description>
          <link>${url.origin}/posts/${post.front_matter.slug}/</link>
          <pubDate>${new Date(post.created_at)}</pubDate>
          <content:encoded>${''} 
            <div style="margin-top: 50px; font-style: italic;">
              <strong>
                <a href="${url.origin}/posts/${post.front_matter.slug}">
                  Keep reading
                </a>
              </strong>  
            </div>
          </content:encoded>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`