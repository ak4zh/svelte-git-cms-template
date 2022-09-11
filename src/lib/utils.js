import { dev } from "$app/environment"
import { GITHUB_REPO } from "./siteConfig"

const DOMAIN_MAPPING = {
    "127.0.0.1": 'ak4zh/svelte-git-cms',
    "easy-vans-learn-182-70-225-212.loca.lt": "sw-yx/swyxkit"
}

/**
 * @param {URL} url
 * @returns {string}
 */
export function getCurrentRepo(url) {
    // @ts-ignore
    if (DOMAIN_MAPPING[url.hostname]) {
        // @ts-ignore
        return DOMAIN_MAPPING[url.hostname]
    }
    let repo = GITHUB_REPO
    let hostname = url.hostname.split('.')
    if (!dev && hostname.length === 3 && url.hostname.includes('--')) {
        repo = hostname[0].replace('--', '/')
    }
    return repo
}
