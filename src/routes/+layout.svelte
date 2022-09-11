<script>
	import '@brainandbones/skeleton/styles/tailwind.css';
	import '@brainandbones/skeleton/styles/core.css';
	import '@brainandbones/skeleton/styles/typography.css';
	import '@brainandbones/skeleton/styles/themes/theme-seafoam.css';
	import '../app.postcss';
	import { LightSwitch } from '@brainandbones/skeleton';
	import { AppShell, AppBar } from '@brainandbones/skeleton';
	import { SITE_TITLE } from '$lib/siteConfig';
	import { page } from '$app/stores';

</script>

<div class="bg-primary-50 dark:bg-primary-600 min-h-screen min-w-screen" data-sveltekit-prefetch>
	<AppShell>
		<svelte:fragment slot="header">
			<AppShell>
				<svelte:fragment slot="header">
					<AppBar>
						<svelte:fragment slot="lead">
							<a href={$page.url.pathname == '/' ? '#' : '/'}>{SITE_TITLE}</a>
						</svelte:fragment>
						(search)
						<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
					</AppBar>
				</svelte:fragment>
			</AppShell>
		</svelte:fragment>
		<div class="max-w-7xl p-4 mx-auto">
			<slot />
		</div>
	</AppShell>
</div>
