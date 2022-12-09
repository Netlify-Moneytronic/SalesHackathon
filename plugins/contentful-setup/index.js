const spaceImport = require('contentful-import')
const exportFile = require('./export.json')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, BUILD_TOKEN } = process.env

module.exports = {
    onPreBuild: async ({ utils, constants }) => {

        console.log('Your contants are listied below');
        console.log(constants);


        async function fetchBuildHistory() {
            return fetch(
                `https://api.netlify.com/api/v1/sites/${constants.SITE_ID}/builds`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${BUILD_TOKEN}`,
                    }
                }
            ).then((response) => response.json())
        }

        const response = await fetchBuildHistory();
        console.log(response);

        if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
            throw new Error(
                [
                    'Parameters missing...',
                    'Please run the setup command as follows',
                    'CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX npm run setup',
                ].join('\n')
            )
        }

        await spaceImport({
            spaceId: CONTENTFUL_SPACE_ID,
            managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
            content: exportFile,
        })
            .then(() => console.log('The content model of your space is set up!'),
                utils.status.show({
                    title: "Content Loadeded Successfully",
                    summary: "✅ Success: We've Loaded in your Pre-Built Content",
                    text: "You're all set!",
                }))
            .catch((e) => console.error(e))
    },
};