<script lang="ts">
	import '@brainandbones/skeleton/styles/tailwind.css';
	import '@brainandbones/skeleton/styles/core.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/forms.css';
	import '@brainandbones/skeleton/styles/themes/theme-skeleton.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch, List, ListItem } from '@brainandbones/skeleton';
	import { page } from '$app/stores';
	import { getCurrentRepo } from '$lib/utils';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte'

	$: currentRepo = getCurrentRepo($page.url)

	/** @type {import('svelte/store').Writable<string[]>} */
	let selectedTags = writable([]);

	/** @type {}*/
	/** @type {import('svelte/store').Writable<import('svelte-git-cms/types').PostLabels>} */
	let availableTags = writable([])

	setContext('selectedTags', selectedTags)
	setContext('availableTags', availableTags)
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href={$page.url.pathname == '/' ? '#' : '/'}>
					<div class="flex gap-2 items-end text-xs">
						<span class="text-3xl">{currentRepo.split('/')[1]}</span>
						<span>by</span>
						<span>{currentRepo.split('/')[0]}</span>
					</div>
				</a>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<a href="/blog">blog</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		{#if $availableTags.length}
		<div class="bg-surface-200 dark:bg-surface-800 p-2">
			<h2>Select Tags</h2>
			<List tag="ol" selected={selectedTags}>
				{#each $availableTags as tag}
				<div style="background-color: #{tag.color}" class="rounded-full">
					<ListItem hover="hover:bg-primary-500/10" highlight="" lead="#" value={tag.name} class="text-black dark:text-black space-x-0">
						<svelte:fragment slot="lead">
							{#if $selectedTags.includes(tag.name)}
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>							  
							{/if}
						</svelte:fragment>
						{tag.name}
					</ListItem>
				</div>
				{/each}
			</List>
		</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- Be sure to insert your route <slot> in the default position --->
	<div class="p-4 mx-auto max-w-7xl">
		<slot />		
	</div>
</AppShell>	
