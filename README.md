## Netlifu

Login or Signup to [Netlify](https://app.netlify.com)
You will need a Netlify account to complete this project. 
- [ ] unchecked Netlify account created? 
## Github

Login or Signup to [Github](https://github.com/signup?source=login)
You will need a GitHub account to complete this project. 
- [ ] Github account created? 
## Setup Contentful

Login or Signup to [Contentful](https://www.contentful.com/sign-up/) 
You will need a Github account to complete this project. 
- [ ] unchecked Contentful account created?


In order to save time, your work will be entirely done in your github repo and the Netlify UI. 
## One-click Deploy with Netlify (recommended)

Please click on the Depoly to Netlify button below. This will clone your repo to your github repository, as well as deploy your application to your Netlify instance. 

#Before you click on the deploy to Netlify button, you will need the following handy:

- `Name of Repository` **Any name you like** 
- `CONTENTFUL_SPACE_ID` should be the **Space ID** field of your API Key
- `CONTENTFUL_ACCESS_TOKEN` should be the **[Content Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN` should be the **[Content Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/) - access token** field of your API key
- `CONTENTFUL_PREVIEW_SECRET` should be any value you want. It must be URL friendly as the dashboard will send it as a query parameter to enable preview mode

The one-click deploy allows you to connect Netlify to your GitHub account to clone the `SalesHackathon` repository and deploy it automatically. Be sure to go to [Github](https://github.com/signup?source=login) and [Contentful](https://www.contentful.com/sign-up/) to sign up for an account before clicking the deploy button.

[![Deploy to Netlify button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Netlify-Moneytronic/SalesHackathon)

By clicking the above button, you will be navigated to the Netlify’s direct deploy page with the project’s repository passed as parameters in the url. Click the **Connect to GitHub** button, name your repository and enter in this your Contentful Values as input as follows: 

Once your site is live, navigate to Contentful to see that the content model is already completed. 

## Publish via buildhooks

After you deploy the site to Netlify you can configure it to build whenever new a new entry is published in Contentful. To configure this navigate to your site settings on Netlify and go to the Build & Deploy tab. Find the Build hooks section and add a new build hook. Name the build hook something like Contentful and select your production branch.

![A screenshot of adding a build_hook in the Netlify UI](screenshot_create_build_hook.png)

Copy the generated URL and navigate to Settings > Webhooks in your Contentful space. Under Webhook Templates click Add next to the Netlify template. Add the URL you just copied and click Create webhook.

![A screenshot of adding a build hook in the Contentful UI](screenshot_configure_build_hook.png)
## Configure Next.js preview mode

In your Contentful space, go to Settings > Content preview and add a new content preview. Under content preview URLs check Blog Post and add this URL

```text
https://$NETLIFY_URL/api/preview?secret=$SECRET&slug={entry.fields.slug}&contentType=blogPost
```

Replacing `$NETLIFY` with the URL of your site deployed on Netlify and `$SECRET` which a secret value that you generate. Store this value as you will add to your Netlify environment variables in a moment.

Check Page Content and add this URL

```text
https://$NETLIFY_URL/api/preview?secret=$SECRET&slug={entry.fields.slug}&contentType=pageContent
```

Replacing the variables with the same values you used above. Navigate to your site on Netlify and go to Site settings > Build & Deploy > Environment and add the following environment variables

```text
CONTENTFUL_PREVIEW_SECRET
NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
```