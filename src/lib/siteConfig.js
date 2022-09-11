import { env } from '$env/dynamic/public'

export const SITE_TITLE = env?.PUBLIC_SITE_TITLE || 'SvelteGitCMS'
export const GITHUB_REPO = env?.PUBLIC_GITHUB_REPO || 'ak4zh/svelte-git-cms'
export const LABEL_PREFIX = env?.PUBLIC_LABEL_PREFIX || ''
export const LABEL_PUBLISHED = env?.PUBLIC_LABEL_PUBLISHED || ''
