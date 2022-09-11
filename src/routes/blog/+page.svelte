<script>
    import { Card } from '@brainandbones/skeleton';
    import { getContext } from 'svelte';

    /** @type {import('./$types').PageServerData} */
    export let data
    let filteredPosts = data.posts

    /** @type {import('svelte/store').Writable<any[]>} */
    let availableTags = getContext('availableTags')

    /** @type {import('svelte/store').Writable<string[]>} */
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
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each filteredPosts as post}            
        <Card class="border-4 border-double" body="space-y-4">
            <a href="/{post.front_matter.slug}">
                <h6>{post.title}</h6>
            </a>
            {@html post.front_matter.description}
        </Card>
    {/each}
</section>
