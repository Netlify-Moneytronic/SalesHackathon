const spaceImport = require('contentful-import')
const exportFile = require('./export.json')
const fetch = require('node-fetch');

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, NETLIFY_API_TOKEN, NETLIFY_TEAM_SLUG } = process.env

module.exports = {
    onPreBuild: async ({ utils, constants }) => {

        const apiToken = NETLIFY_API_TOKEN;
        const teamSlug = NETLIFY_TEAM_SLUG;

        async function deleteEnvironmentVariable(envVar) {
            const url = `https://api.netlify.com/api/v1/accounts/${teamSlug}/env/${envVar}?site_id=${constants.SITE_ID}`;
            return fetch(
                url,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${apiToken}`,
                    }
                }
            )
        }

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
            await deleteEnvironmentVariable("NETLIFY_API_TOKEN").catch((error) => {
                console.log(error);
                utils.status.show({
                    title: "Failed to Delete Netlify API Token",
                    summary: "❌ Error: We've Failed to Delete your NETLIFY_API_TOKEN environment variable",
                    text: "See console for error",
                })
            })
            await deleteEnvironmentVariable("NETLIFY_TEAM_SLUG").catch((error) => {
                console.log(error);
                utils.status.show({
                    title: "Failed to Delete NETLIFY_TEAM_SLUG",
                    summary: "❌ Error: We've Failed to Delete your NETLIFY_TEAM_SLUG environment variable",
                    text: "See console for error",
                })
            })
        } else {
            utils.status.show({
                title: "No Content to Load",
                summary: "✅ Content Detected",
                text: "We detected that you already have content in your space so we didn't load any content"
            })
        }
    }
};