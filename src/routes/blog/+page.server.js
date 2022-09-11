import { getCmsData } from 'svelte-git-cms';
import { env } from '$env/dynamic/public'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { posts, labels } = await getCmsData(env.PUBLIC_GITHUB_REPO)
    return {
        posts,
        labels
    }
}