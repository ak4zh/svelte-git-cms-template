<script lang="ts">
    import { AppShell, Card } from '@brainandbones/skeleton';
    import { RadioGroup, RadioItem } from '@brainandbones/skeleton';    
    import { writable, type Writable } from "svelte/store";

    /** @type {import('./$types').PageServerData} */
    export let data

    const tagStore: Writable<string> = writable("");
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
