<script>
	import '@brainandbones/skeleton/styles/tailwind.css';
	import '@brainandbones/skeleton/styles/core.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/forms.css';
	import '@brainandbones/skeleton/styles/themes/theme-seafoam.css';
	import '../app.postcss';
	import { LightSwitch } from '@brainandbones/skeleton';
	import { AppShell, AppBar } from '@brainandbones/skeleton';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { page } from '$app/stores';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a href={$page.url.pathname == '/' ? '#' : '/'}>{SITE_TITLE}</a>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<a href="/blog">blog</a>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageHeader"></svelte:fragment>
	<svelte:fragment slot="pageFooter"></svelte:fragment>
	<!-- Be sure to insert your route <slot> in the default position --->
	<div class="p-4 mx-auto max-w-7xl">
		<slot />		
	</div>
</AppShell>	
