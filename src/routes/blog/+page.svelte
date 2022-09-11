<script lang="ts">
    import { AppShell, Card } from '@brainandbones/skeleton';
    import { RadioGroup, RadioItem } from '@brainandbones/skeleton';    
    import { writable, type Writable } from "svelte/store";

    /** @type {import('./$types').PageServerData} */
    export let data

    const tagStore: Writable<string> = writable("");
</script>

<AppShell>
	<svelte:fragment slot="sidebarRight">
        <RadioGroup selected={tagStore} background="bg-accent-500" color="text-white" width="w-auto">
            <div class="flex flex-col gap-4 bg-primary-50 p-4">
                {#each data.labels as label}
                    <RadioItem value={label.name}>{label.name}</RadioItem>
                {/each}
            </div>
        </RadioGroup>        
    </svelte:fragment>

    <h1>Posts</h1>
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each data.posts as post}            
            <Card class="border-4 border-double" body="space-y-4">
                <a href="/{post.front_matter.slug}">
                    <h6>{post.title}</h6>
                </a>
                {@html post.body}
            </Card>
        {/each}
    </section>
</AppShell>



