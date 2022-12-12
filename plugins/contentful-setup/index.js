const spaceImport = require('contentful-import')
const exportFile = require('./export.json')
const contentful = require('contentful-management')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN } = process.env


module.exports = {
    onPreBuild: async ({ utils }) => {
        const client = contentful.createClient({
            accessToken: CONTENTFUL_MANAGEMENT_TOKEN
        })


        await client.getSpace(CONTENTFUL_SPACE_ID)
            .then((space) => space.getEnvironment('master'))
            .then((environment) => environment.getContentTypes())
            .then((response) => console.log(response.items))
            .catch(console.error)



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
