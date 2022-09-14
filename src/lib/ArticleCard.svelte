<script>
    import { page } from '$app/stores';
    import { Card, Avatar } from '@brainandbones/skeleton';
    import { getCurrentRepo } from './utils';

    /** @type {import('svelte-git-cms/types').Post} */
    export let post

    const repo = getCurrentRepo($page.url)
    let ogImage = `/~og?fontFamily=Roboto&title=${post.title}`
    +`&titleTailwind=text-gray-800%20font-bold%20text-6xl`
    // +`&text=${post.front_matter.description}`
    +`&textTailwind=text-gray-700%20text-2xl%20mt-4`
    +`&logoTailwind=h-8`
    +`&bgTailwind=bg-white`
    +`&footer=${$page.url.hostname}`
    +`&footerTailwind=text-teal-600`
</script>

<Card class="cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-xl overflow-hidden">
    <svelte:fragment slot="header">
        <div class="-mt-4 -mx-4">
            <a href="/{post.front_matter.slug}">
                <img src="{ogImage}" alt="{post.title}" />
            </a>
        </div>
    </svelte:fragment>
    <div class="space-y-2">
        <a href="/{post.front_matter.slug}" class="inline-flex">
            <h2 class="text-primary-500 underline decoration-dotted">
                {post.title}
            </h2>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
        </a>
        <div class="flex flex-wrap gap-2 text-sm">
            {#each post.tags as tag}
                <button class="rounded-xl px-2 bg-surface-300 dark:bg-surface-600">{tag}</button> 
            {/each}
        </div>
        <p class="text-xs font-light">{post.reading_time} read</p>

        <article class="text-surface-400">
            {post.front_matter.description}
        </article>
    </div>
    <svelte:fragment slot="footer">
        <div class="flex justify-start items-center space-x-4">
            <Avatar src="{post.author.avatar_url}" size="sm" outlined />
            <div>
                <h6 class="font-bold">{post.author.username}</h6>
                <p>{new Date(post.created_at).toLocaleString()}</p>
            </div>
        </div>
    </svelte:fragment>
</Card>