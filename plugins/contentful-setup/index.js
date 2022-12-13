const spaceImport = require('contentful-import')
const exportFile = require('./export.json')
const contentful = require('contentful-management')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT_ID } = process.env


module.exports = {
    onPreBuild: async ({ utils }) => {

        const client = contentful.createClient({
            accessToken: CONTENTFUL_MANAGEMENT_TOKEN
        })

        const getContentfulItems = async () => {
            const space = await client.getSpace(CONTENTFUL_SPACE_ID)
            const environment = await space.getEnvironment(CONTENTFUL_ENVIRONMENT_ID)
            const response = await environment.getContentTypes()
            try {
                return response.items
            } catch (error) {
                throw new Error(error)
            }
        }


        const checkForContent = (items) => {
            const contentModel = ["company", "personal", "profile", 'experience']
            const itemsIds = items.map(item => item.sys.id)
            const result = contentModel.every(item => itemsIds.includes(item))
            return result
        }

        if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN || !CONTENTFUL_ENVIRONMENT_ID) {
            throw new Error(
                [
                    'Parameters missing...',
                    'Please add the following environment variables to your Netlify site:',
                    'CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, CONTENTFUL_ENVIRONMENT_ID',
                ].join('\n')
            )
        }

        try {
            const items = await getContentfulItems();
            if (checkForContent(items)) {
                console.log(`We've detected the content models needed for this template - We've skipped adding dummy content`);
                console.log(`We've detected the following content models:`);
                items.forEach((item, index) => {
                    console.log(`${index + 1}: ${item.sys.id}`)
                })
                utils.status.show({
                    title: "Initial Import Skipped",
                    summary: "✅ Content Detected",
                    text: "We found content in your space, so we skipped adding dummy content",
                }
                )
            } else {
                try {
                    console.log(`We've could not detect the content models needed for this template - We're loading in the dummy content`);
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
        } catch (error) {
            utils.status.show({
                title: "Contentful Failed to Load",
                summary: "❌ Error: We failed to connect to your contentful instance",
                text: "Please check your credentials and try again later",
            })
            throw new Error(error)
        }
    }
}
