const spaceImport = require('contentful-import')
const exportFile = require('./export.json')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, URL } = process.env

module.exports = {
    onPreBuild: async ({ utils, constants }) => {

        console.log('Your contantsa are listied below');
        console.log(constants);

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