<script>
    import { Card } from '@brainandbones/skeleton';
    /** @type {import('./$types').PageServerData} */
    export let data
</script>

<Card class="border-4 border-dotted" space="space-y-1">
	<svelte:fragment slot="header"><h2>{data.post.title}</h2></svelte:fragment>
	{@html data.post?.body}
	<svelte:fragment slot="footer">(footer)</svelte:fragment>
</Card>
