# Paddle Integration Project

## Firebase Configuration

This project requires Firebase Admin SDK credentials for server-side operations, particularly webhook handling.

### Setup Instructions

1. **Create a Firebase Service Account Key**:
   - Go to your [Firebase Console](https://console.firebase.google.com/)
   - Select your project
   - Navigate to Project Settings > Service Accounts
   - Click "Generate New Private Key"
   - Save the JSON file securely

2. **Configure Environment Variables**:
   - Copy the `.env.example` file to `.env.local`
   - Fill in the Firebase credentials from your service account key:
     ```
     FIREBASE_PROJECT_ID=your-project-id
     FIREBASE_CLIENT_EMAIL=your-client-email
     FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key Content\n-----END PRIVATE KEY-----"
     ```
   - Make sure to keep the newline characters (`\n`) in the private key

3. **Paddle Configuration**:
   - Add your Paddle public key and client token:
     ```
     PADDLE_PUBLIC_KEY=your-paddle-public-key
     NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=your-paddle-client-token
     ```

4. **Development Mode**:
   - For local testing, you can enable these options:
     ```
     NODE_ENV=development
     BYPASS_PADDLE_VERIFICATION=true
     PROCESS_INVALID_SIGNATURES=true
     ```

## Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Webhook Testing

You can use the included test-webhook.js script to simulate Paddle webhooks:

```bash
node test-webhook.js
```

## Troubleshooting

If you encounter the error "Unable to detect a Project Id in the current environment", make sure:
1. Your environment variables are correctly set with Firebase credentials
2. The app is properly initializing Firebase Admin using those credentials

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
