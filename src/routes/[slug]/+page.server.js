import { error } from '@sveltejs/kit';
import { getCmsData } from 'svelte-git-cms';
import { getCurrentRepo } from '$lib/utils';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, url }) {
    let repo = getCurrentRepo(url)
    const { posts } = await getCmsData(repo)
    let post = posts.find(item => item.front_matter.slug === params.slug)
    if (!post) throw error(404, 'Not found');
    return { post }
}