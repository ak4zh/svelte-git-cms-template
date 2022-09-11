<script>
    import { Card } from '@brainandbones/skeleton';
    import { getContext } from 'svelte';

    /** @type {import('./$types').PageServerData} */
    export let data

    /** @type {import('svelte/store').Writable<string[]>} */
    let availableTags = getContext('availableTags')
    $: availableTags.set(data.labels)
</script>

    <h1>Posts</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each data.posts as post}            
            <Card class="border-4 border-double" body="space-y-4">
                <a href="/{post.front_matter.slug}">
                    <h6>{post.title}</h6>
                </a>
                {@html post.front_matter.description}
            </Card>
        {/each}
    </section>
