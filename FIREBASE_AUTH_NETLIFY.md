# Configuring Firebase Authentication for Netlify

When moving your application to Netlify, you need to properly configure Firebase Authentication to ensure it works correctly with your new domain.

## Essential Steps:

1. **Add Your Netlify Domain to Authorized Domains**

   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to Authentication → Settings → Authorized Domains
   - Add your Netlify domain (e.g., `your-app.netlify.app`)
   - If you're using a custom domain, add that as well

2. **Update OAuth Redirect URIs (if using OAuth providers like Google)**

   - Go to Authentication → Sign-in method
   - For each enabled provider (Google, Facebook, etc.)
   - Update the authorized redirect URIs to include your Netlify domain

3. **Environment Variables**

   Make sure these environment variables are set in Netlify's dashboard:
   
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_value
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_value
   ```

4. **Test Authentication Flow**

   After deployment, test the full authentication flow:
   - Sign up
   - Sign in
   - Password reset
   - OAuth (if used)

## Common Issues:

- **Popup Blocked**: Make sure your CSP (Content Security Policy) allows popups from authentication providers
- **Redirect Issues**: Check that the redirect URI exactly matches what's in your Firebase console
- **CORS Errors**: Ensure your Firebase project has the correct domains authorized

If you encounter issues, check the browser console for specific error messages from Firebase Auth. 