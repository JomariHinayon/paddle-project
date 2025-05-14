# Netlify Deployment Checklist

## 1. Pre-Deployment

- [ ] Run a full local build to catch errors: `npm run build`
- [ ] Ensure all environment variables are documented
- [ ] Commit latest changes to your Git repository

## 2. Netlify Setup

- [ ] Create a Netlify account if you don't have one
- [ ] Connect your Git repository to Netlify
- [ ] Set the build command to `npm run build`
- [ ] Set the publish directory to `.next`
- [ ] Install the Netlify Next.js plugin

## 3. Environment Variables

- [ ] Add all Firebase environment variables:
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

- [ ] Add all Paddle environment variables:
  - [ ] `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`
  - [ ] `NEXT_PUBLIC_PADDLE_SELLER_ID`
  - [ ] `NEXT_PUBLIC_PADDLE_ENVIRONMENT` (sandbox/production)
  - [ ] `NEXT_PUBLIC_PADDLE_STANDARD_PLAN_ID`
  - [ ] `NEXT_PUBLIC_PADDLE_PREMIUM_PLAN_ID`

## 4. Firebase Configuration

- [ ] Add Netlify domain to Firebase authorized domains
- [ ] Update OAuth redirect URIs for all auth providers
- [ ] Test authentication flow post-deployment
- [ ] Check that Firestore security rules are production-ready

## 5. Paddle Configuration

- [ ] Update webhook URLs in Paddle dashboard:
  - [ ] `https://your-netlify-domain.netlify.app/api/webhooks/paddle`
- [ ] Ensure webhook events are configured:
  - [ ] Subscription Created
  - [ ] Subscription Updated
  - [ ] Subscription Cancelled
  - [ ] Payment Succeeded
  - [ ] Payment Failed

## 6. Post-Deployment Checks

- [ ] Verify all pages load correctly
- [ ] Test user authentication (signup, login, password reset)
- [ ] Test subscription purchase flow
- [ ] Test webhook functionality
- [ ] Check for any console errors
- [ ] Test on both mobile and desktop browsers

## 7. Performance & Security

- [ ] Confirm Content Security Policy settings are correct
- [ ] Set up custom domain (if needed)
- [ ] Enable HTTPS
- [ ] Test page load performance

## 8. Monitoring

- [ ] Set up Netlify notifications for build failures
- [ ] Ensure Firebase Analytics is working (if used)
- [ ] Check that error logging is properly configured

## Required Files (Already Created)

- [x] `netlify.toml` - Configuration file
- [x] `public/_redirects` - Client-side routing config

Use this checklist to ensure a smooth deployment to Netlify. 