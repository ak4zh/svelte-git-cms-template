<script>
    import ArticleCard from '$lib/ArticleCard.svelte';
    import { Card } from '@brainandbones/skeleton';
    import { getContext } from 'svelte';

    /** @type {import('./$types').PageServerData} */
    export let data
    let filteredPosts = data.posts

    let availableTags = getContext('availableTags')
    let searchParams = getContext('searchParams')

    function filterContent() {
        return data.posts
            .filter(
                post => $searchParams?.tags
                ? post.tags.some(tag => ($searchParams?.tags || '').includes(tag))
                : true
            )
            .filter(
                post => $searchParams?.keyword
                ? (
                    (post.title || ' ') + (post.front_matter.description || ' ') + (post.front_matter.slug || ' ')
                ).toLowerCase().includes($searchParams?.keyword.toLowerCase())
                : true
            )
    }

    $: if ($availableTags !== data.labels) availableTags.set(data.labels)
    $: filteredPosts = $searchParams && filterContent()
</script>

<input bind:value={$searchParams.keyword}/>
<h1>Posts</h1>
<section class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
    {#each filteredPosts as post}      
        <ArticleCard {post}/>
    {/each}
</section>
