<script>
    import { page } from '$app/stores';
    import { getCurrentRepo } from '$lib/utils';
    import { Card } from '@brainandbones/skeleton';
    import { MetaTags } from 'svelte-meta-tags';

    /** @type {import('./$types').PageServerData} */
    export let data

    const repo = getCurrentRepo($page.url)

    let ogImage = `https://og.tailgraph.com/og?fontFamily=Roboto&title=${data.post.title}`
    +`&titleTailwind=text-gray-800%20font-bold%20text-6xl`
	+`&text=${data.post.front_matter.description}`
	+`&textTailwind=text-gray-700%20text-2xl%20mt-4`
	+`&logoTailwind=h-8`
	+`&bgTailwind=bg-white`
	+`&footer=${$page.url.hostname}`
	+`&footerTailwind=text-teal-600`
</script>

<MetaTags
	description="{data.post.front_matter.description}"
    openGraph={{
        url: $page.url.href,
        title: data.post.title,
        description: data.post.front_matter.description,
        images: [
          {
            url: ogImage,
            alt: `${data.post.title} | ${repo.split('/')[0]}`
          }
        ],
        site_name: repo.split('/')[0]
      }}
      twitter={{
        cardType: 'summary_large_image',
        title: data.post.title,
        description: data.post.front_matter.description,
        image: ogImage,
        imageAlt: `${data.post.title} | ${repo.split('/')[0]}`
      }}
/>

<Card class="border-4 border-dotted" space="space-y-1">
	<svelte:fragment slot="header"><h2>{data.post.title}</h2></svelte:fragment>
	{@html data.post?.body}
	<svelte:fragment slot="footer">(footer)</svelte:fragment>
</Card>
