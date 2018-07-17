module.exports = {
    mongo: {
        name: 'paprazzi',
        host: 'localhost',
        port: '27017'
    },
    target: {
        base: process.env.PAP_BASE,
        excludedPaths: ['watch-', 'sky-sports-live', 'kids-tv-shows', 'ie'],
        auth: process.env.PAP_AUTH,
        pageSource: process.env.PAP_PAGE_SOURCE
    },
    webdriver: {
        baseUrl: process.env.PAP_BASE,
        desiredCapabilities: {
            browserName: 'chrome'
        }
    },
    images: {
        dir: `${process.env.PWD}/images/`
    }
};
