const spaceImport = require('contentful-import')
const exportFile = require('./export.json')
const fetch = require('node-fetch');

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, NETLIFY_API_TOKEN, NETLIFY_TEAM_SLUG } = process.env

module.exports = {
    onPreBuild: async ({ utils, constants }) => {

        // async function fetchBuildHistory() {
        //     return fetch(
        //         `https://api.netlify.com/api/v1/sites/${constants.SITE_ID}/builds`,
        //         {
        //             method: 'GET',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //                 Authorization: `Bearer ${BUILD_TOKEN}`,
        //             }
        //         }
        //     ).then((response) => response.json())
        // }

        if (NETLIFY_API_TOKEN && NETLIFY_TEAM_SLUG) {

            if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
                throw new Error(
                    [
                        'Parameters missing...',
                        'Please run the setup command as follows',
                        'CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX npm run setup',
                    ].join('\n')
                )
            }

            try {
                await spaceImport({
                    spaceId: CONTENTFUL_SPACE_ID,
                    managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
                    content: exportFile,
                })
                utils.status.show({
                    title: "Content Loadeded Successfully",
                    summary: "✅ Success: We've Loaded in your Pre-Built Content",
                    text: "You're all set!",
                })
            } catch (error) {
                utils.status.show({
                    title: "Content Load Failed",
                    summary: "❌ Error: We've Failed to Load in your Pre-Built Content",
                    text: "Please try again later",
                })
                throw new Error(error)
            }
        }
    }
};