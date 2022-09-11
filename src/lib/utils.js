import { dev } from "$app/environment"
import { GITHUB_REPO } from "./siteConfig"

const DOMAIN_MAPPING = {
    "cms": GITHUB_REPO
}

/**
 * @param {URL} url
 * @returns {string}
 */
export function getCurrentRepo(url) {
    let repo = GITHUB_REPO
    let urlParts = url.hostname.split('.')
    if (!dev || urlParts.length === 3) {
        let subdomain = urlParts[0]
        // @ts-ignore
        if (DOMAIN_MAPPING[subdomain]) return DOMAIN_MAPPING[subdomain]
        if (subdomain.includes('--')) {
            repo = subdomain.replace('--', '/')
        }
    }
    return repo
}
