import { githubSync } from 'svelte-git-cms'
import { env as privateEnv } from '$env/dynamic/private'
import { getCurrentRepo } from '$lib/utils'
import { GITHUB_REPO, LABEL_PREFIX, LABEL_PUBLISHED } from '$lib/siteConfig'


/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    if (event.url.pathname.startsWith("/~og")) {
        return fetch(`https://og.tailgraph.com/og${event.url.search}`);
    }
    let repo = getCurrentRepo(event.url)

    /** @type {import('svelte-git-cms/types').Config} */
    let config = {
        github_repo: repo,
        github_token: privateEnv?.GITHUB_TOKEN,
        label_prefix: LABEL_PREFIX,
        label_published: LABEL_PUBLISHED,
    }
    if (repo !== GITHUB_REPO) config.max_page = 5
    await githubSync(config)
    const response = await resolve(event);
    return response;
}
