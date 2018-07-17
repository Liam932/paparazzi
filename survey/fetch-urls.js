const Sitemapper = require('sitemapper');
const request = require('request-promise');
const config = require('config');
const EXCLUDED_PATHS = config.target.excludedPaths;
const PAGE_SOURCE = config.target.pageSource;
const AUTH = config.target.auth;

async function fetchURLsFromSitemap({ base }) {
    const sitemap = new Sitemapper();
    const {sites} = await sitemap.fetch(`${base}/www-sitemap.xml`);
    const filtered = sites.filter(x => EXCLUDED_PATHS.every(path => !x.includes(path)));
    return filtered.map(x => x.replace(new RegExp(base, 'g'), ''));
}

async function fetchUrlsFromPublished() {
    const returned = await request(PAGE_SOURCE , {
        headers: {
            'Authorization': `Bearer ${AUTH}`
        },
        json: true
    });
    const urls = returned.map(x => x.primaryUrl || x.slug);
    return urls.filter(x => EXCLUDED_PATHS.every(path => !x.includes(path))).sort();
}

module.exports = {
    fetchURLsFromSitemap,
    fetchUrlsFromPublished
};
