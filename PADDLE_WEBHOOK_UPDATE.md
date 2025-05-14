# Updating Paddle Webhook URLs

After deploying to Netlify, you'll need to update your Paddle webhook URLs to point to your production domain.

## Steps:

1. Log in to your [Paddle Dashboard](https://vendors.paddle.com/alerts-webhooks)

2. Go to Developer Tools → Webhooks

3. Update the webhook URL to your new Netlify domain:
   ```
   https://your-netlify-domain.netlify.app/api/webhooks/paddle
   ```

4. Make sure alert settings are configured properly:
   - Subscription Created
   - Subscription Updated
   - Subscription Cancelled
   - Payment Succeeded
   - Payment Failed

5. Test the webhook to ensure it's working correctly

## Important:
- If you're still using Sandbox mode, make sure to update both your sandbox and production webhook URLs
- Ensure your environment variables in Netlify match your Paddle environment (sandbox or production)
- The webhook secret should be kept secure and added to your Netlify environment variables 