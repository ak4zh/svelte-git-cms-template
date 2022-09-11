import { getCmsData } from 'svelte-git-cms';
import { env } from '$env/dynamic/public'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { posts } = await getCmsData(env.PUBLIC_GITHUB_REPO)
    let featured = posts.filter(post => post.front_matter.featured)
    let recent = posts.slice(0, 3)
    return {
        featured,
        recent
    }
}