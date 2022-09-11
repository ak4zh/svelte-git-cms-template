<script>
    import { Card } from '@brainandbones/skeleton';

    /** @type {import('./$types').PageServerData} */
    export let data
</script>

<h1>Featured Posts</h1>
<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each data.featured as post}
        <Card body="space-y-4">
            <h6>{post.title}</h6>
            {@html post.body}
        </Card>
    {/each}
</section>


<h1>Recent Posts</h1>
<section class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
    {#each data.recent as post}
        <Card body="space-y-4">
            <h6>{post.title}</h6>
            {@html post.body}
        </Card>
    {/each}
</section>