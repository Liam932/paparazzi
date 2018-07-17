const config = require('config');
const fs = require('fs');
const util = require('util');
const client = require('./webdriver');
const { fetchUrlsFromPublished } = require('./fetch-urls');
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

async function cleanDir(directory) {
    try {
        const files = await readdir(directory);
        const unlinkPromises = files.map(filename => unlink(`${directory}/${filename}`));
        return await Promise.all(unlinkPromises);
    } catch (err) {
        console.log(err);
    }
}

const takeScreenshot = url => {
    const title = url.replace(/\//g, '_') || 'home';
    console.log(`Taking screenshot for ${url} image: ${title}`);
    return client.url(url).saveDocumentScreenshot(`${config.images.dir}${title}.png`).catch(console.log);
};

async function execute() {
    try {
        const urls = await fetchUrlsFromPublished();
        console.log('Chart Plotted');
        console.log(`Visiting ${urls.length} Stars`);
        await client.init();
        console.log('Igniting Thrusters');
        await client.url(config.target.base).setCookie({name: 'cookie_terms', value: '123'});
        console.log('Cookie Banner Squashed');
        await cleanDir(config.images.dir);
        console.log('Old Images Vaporised');
        return await Promise.map(urls, takeScreenshot, { concurrency: 1 });
    } catch (e) {
        console.log(e);
    }
}

execute();
