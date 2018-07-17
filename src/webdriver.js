const webdriverio = require('webdriverio');
const wdioScreenshot = require('wdio-screenshot');
const config = require('config');

const client = webdriverio.remote(config.webdriver);
wdioScreenshot.init(client);

module.exports = client;
