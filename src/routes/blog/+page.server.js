import { getCmsData } from 'svelte-git-cms';
import { getCurrentRepo } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
    let repo = getCurrentRepo(url)
    const { posts, labels } = await getCmsData(repo)
    return {
        posts,
        labels
    }
}