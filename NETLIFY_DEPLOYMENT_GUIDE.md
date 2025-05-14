# Netlify Deployment Guide

## Prerequisites
- A Netlify account
- Git repository with your project

## Step 1: Connect to Netlify

1. Go to [Netlify](https://app.netlify.com/) and log in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, etc.)
4. Select your repository

## Step 2: Configure Build Settings

- Build command: `npm run build` (already set in netlify.toml)
- Publish directory: `.next` (already set in netlify.toml)

## Step 3: Environment Variables

Add the following environment variables in Netlify's deploy settings (Settings → Environment):

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_value_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_value_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_value_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_value_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_value_here
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your_value_here
NEXT_PUBLIC_PADDLE_SELLER_ID=your_value_here
NEXT_PUBLIC_PADDLE_ENVIRONMENT=production (or sandbox)
NEXT_PUBLIC_PADDLE_STANDARD_PLAN_ID=your_value_here
NEXT_PUBLIC_PADDLE_PREMIUM_PLAN_ID=your_value_here
```

Copy these values from your `.env.local` file.

## Step 4: Netlify Functions (if needed)

If you're using Firebase Functions that need to run on the server, you'll need to create Netlify Functions:

1. Create a `netlify/functions` directory
2. Move your serverless functions there
3. Update any references to these functions in your code

## Step 5: Deploy

1. Click "Deploy site"
2. Wait for the build to complete
3. Your site will be live at `https://your-site-name.netlify.app`

## Post-Deployment

1. Set up a custom domain if needed (Settings → Domain management)
2. Update any webhook URLs in Paddle to point to your production domain
3. Verify Firebase authentication redirect URLs include your Netlify domain

## Troubleshooting

- If you see routing issues, check that the `_redirects` file is in the `public` directory
- If builds fail, check the build logs in Netlify for specific errors
- For API/server issues, check that your environment variables are correctly set 