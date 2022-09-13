<script>
	import '@brainandbones/skeleton/styles/tailwind.css';
	import '@brainandbones/skeleton/styles/core.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/forms.css';
	import '@brainandbones/skeleton/styles/themes/theme-skeleton.css';
	import '../app.postcss';
	import { AppShell, AppBar, LightSwitch } from '@brainandbones/skeleton';
	import { page } from '$app/stores';
	import { getCurrentRepo } from '$lib/utils';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte'
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// stores
	/**
     * @typedef {"tags" | "keyword"} SearchParamsKeys
     */
	/** @type {import('svelte/store').Writable<Object<SearchParamsKeys, string>>} */
	let searchParams = writable(Object.fromEntries($page.url.searchParams.entries()))

	/** @type {import('svelte/store').Writable<string[]>} */
	let selectedTags = writable([]);

	/** @type {import('svelte/store').Writable<import('svelte-git-cms/types').PostLabels>} */
	let availableTags = writable([])

	searchParams.subscribe(params => {
		// @ts-ignore
		var queryString = Object.keys(params).filter(key => params[key]).map(key => key + '=' + params[key]).join('&');
		if (browser) goto(`?${queryString}`, { noscroll: true, keepfocus: true });
	})

	// contexts
	setContext('searchParams', searchParams)
	setContext('availableTags', availableTags)

	// reactive statements
	$: title = $page.url.pathname.split('/').filter(e => e).slice(-1)[0] || 'home'
	$: currentRepo = getCurrentRepo($page.url)
	$: if ($page.url.pathname !== '/blog') selectedTags.set([])
	$: searchParams.set({...$searchParams, tags: $selectedTags.toString()})
</script>

<svelte:head>
	<title>{currentRepo.split('/')[1]} | {title}</title>
</svelte:head>

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
		{#if $availableTags.length && $page.url.pathname === '/blog'}
		<div class="bg-surface-200 dark:bg-surface-800 p-2 pl-0 h-full">
			<h2 class="text-center">Select Tags</h2>
			<div class="flex flex-col gap-2 mr-2">
				{#each $availableTags as tag}
					<label style="background-color: #{tag.color};" class="text-black px-2 rounded-r-full shadow-white hover:ring-2 hover:ring-offset-2 {$selectedTags.includes(tag.name) ? 'ring-offset-2 opacity-100' : 'opacity-50 hover:opacity-80'}">
						<input class="peer sr-only" type="checkbox" value={tag.name} bind:group={$selectedTags} multiple/>
						<svg class="h-6 w-6 hidden peer-checked:inline-block rounded-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{tag.name}
					</label>
				{/each}
			</div>
		</div>
		{/if}
	</svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<div class="p-4 mx-auto max-w-7xl">
		<slot />		
	</div>
</AppShell>	
