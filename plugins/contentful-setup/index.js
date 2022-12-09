const spaceImport = require('contentful-import')
const exportFile = require('./export.json')

const { CONTENTFUL_SPACE_ID, CONTENTFUL_MANAGEMENT_TOKEN, URL } = process.env

module.exports = {
    onPreBuild: async ({ utils }) => {
        console.log("URL of the Site: " + URL);

        if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_MANAGEMENT_TOKEN) {
            throw new Error(
                [
                    'Parameters missing...',
                    'Please run the setup command as follows',
                    'CONTENTFUL_SPACE_ID=XXX CONTENTFUL_MANAGEMENT_TOKEN=CFPAT-XXX npm run setup',
                ].join('\n')
            )
        }

        spaceImport({
            spaceId: CONTENTFUL_SPACE_ID,
            managementToken: CONTENTFUL_MANAGEMENT_TOKEN,
            content: exportFile,
        })
            .then(() => console.log('The content model of your space is set up!'))
            .catch((e) => console.error(e))

        //   try {
        //       if (cnameCorrect && aCorrect) {
        //         console.log("✅ Site is on Netlify High Performance Edge");
        //         utils.status.show({
        //           title: "HP Edge Setup Status",
        //           summary: "✅ Success: Site is on Netlify High Performance Edge",
        //           // Optional. Empty by default.
        //           text: "You're all set!",
        //         });
        //         return;
        //       }
        //   } catch (error) {
        //     console.log("🚨 WARNING: Site not on HP Edge - Check your DNS configuration");
        //     utils.status.show({
        //       title: "HP Edge Setup Status",
        //       summary: "🚨 WARNING: Site not on HP Edge - Check your DNS configuration",
        //       text: "Please contact Netlify support or your account manager to help with HP Edge setup or an upgrade.",
        //     });

        //   }
    },
};