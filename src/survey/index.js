const config = require('config');
const fs = require('fs');
const util = require('util');
const Promise = require('bluebird');
const client = require('./webdriver');
const { connect } = require('./db');
const Image = require('./image');
const { fetchUrlsFromPublished } = require('./fetch-urls');
const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);
const readFile = util.promisify(fs.readFile);

process.on('beforeExit', async () => {
    console.log('Before Exit');
    return await client.endAll();
});

async function cleanDir(directory) {
    try {
        const files = await readdir(directory);
        const unlinkPromises = files.map(filename => unlink(`${directory}/${filename}`));
        return await Promise.all(unlinkPromises);
    } catch (err) {
        console.log(err);
    }
}

async function takeScreenshot(url) {
    const title = url.replace(/\//g, '_') || 'home';
    console.log(`Taking screenshot for ${url} image: ${title}`);
    const imageLocation = `${config.images.dir}${title}.png`;
    await client.url(url).saveDocumentScreenshot(imageLocation);
    return { location: imageLocation, name: title };
};


async function processScreenshot(url) {
    const { location, name } = await takeScreenshot(url);
    const buffer = await readFile(location);
    const base64 =  buffer.toString('base64');
    await Image.update({ name }, { data: base64, name }, { upsert: true });
    await unlink(location);
    return;
}


async function execute() {
    console.log({
        target: config.target.base
    });
    try {
        await connect();
        const urls = await fetchUrlsFromPublished();
        console.log('Chart Plotted');
        console.log(`Visiting ${urls.length} Stars`);
        await client.init();
        console.log('Igniting Thrusters');
        await client.url(config.target.base).setCookie({name: 'cookie_terms', value: '123'});
        console.log('Cookie Banner Squashed');
        await cleanDir(config.images.dir);
        console.log('Old Images Vaporised');
        return await Promise.map(urls, processScreenshot, { concurrency: 1 });
    } catch (e) {
        console.log(e);
    } finally {
        client.endAll();
    }
}

execute();
