<script>
    import { page } from '$app/stores';
    import ArticleCard from '$lib/ArticleCard.svelte';
    import { Button } from '@brainandbones/skeleton';

    /** @type {import('./$types').PageServerData} */
    export let data
    let repo = ''
    $: domain = $page.url.hostname.split('.')
    $: repoURL = `${$page.url.protocol}//${repo.replace('/', '--')}.${domain[1]}.${domain[2]}`
</script>

<div class="flex flex-col gap-4"> 
    <div class="flex flex-col">
        <label for="repo">
            <span>Try Svelte Git CMS on your own repo</span>
            <input type="text" id="repo" bind:value={repo} minlength="2" pattern="^[\w_-]+/[\w_-]+$" placeholder="ak4zh/svelte-git-cms">
        </label>
        <Button href={repoURL} data-sveltekit-prefetch="">
            GO
        </Button>
    </div>

{#if data.featured.length}
    <h1>Featured Posts</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each data.featured as post}
            <ArticleCard {post}/>
        {/each}
    </section>
{/if}


{#if data.recent.length}
    <h1>Recent Posts</h1>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
        {#each data.recent as post}
            <ArticleCard {post}/>
        {/each}
    </section>
{:else}
    No post pount
{/if}
</div>
