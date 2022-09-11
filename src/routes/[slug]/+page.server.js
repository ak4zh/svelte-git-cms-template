import { getCmsData } from 'svelte-git-cms';
import { env } from '$env/dynamic/public'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { posts } = await getCmsData(env.PUBLIC_GITHUB_REPO)
    let post = posts.find(item => item.front_matter.slug === params.slug)
    return {
        post
    }
}