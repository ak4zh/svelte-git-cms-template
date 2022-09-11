import { getCmsData } from 'svelte-git-cms';
import { getCurrentRepo } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
    let repo = getCurrentRepo(url)
    const { posts } = await getCmsData(repo)
    let featured = posts.filter(post => post.front_matter.featured)
    let recent = posts.slice(0, 3)
    return {
        featured,
        recent
    }
}