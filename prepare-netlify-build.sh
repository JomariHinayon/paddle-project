#!/bin/bash

# This script prepares the codebase for building on Netlify with static export

echo "Preparing for Netlify static build..."

# Create API placeholder directory structure
mkdir -p netlify/prebuild-api-backup/api/auth/logout
mkdir -p netlify/prebuild-api-backup/api/auth/session
mkdir -p netlify/prebuild-api-backup/api/csp-report
mkdir -p netlify/prebuild-api-backup/api/subscriptions/cancel
mkdir -p netlify/prebuild-api-backup/api/subscriptions/get-details
mkdir -p netlify/prebuild-api-backup/api/subscriptions/portal-session
mkdir -p netlify/prebuild-api-backup/api/subscriptions/update-plan
mkdir -p netlify/prebuild-api-backup/api/subscriptions/verify-checkout
mkdir -p netlify/prebuild-api-backup/api/webhook/paddle
mkdir -p netlify/prebuild-api-backup/api/webhooks/paddle

# Create placeholder static API routes
for dir in $(find netlify/prebuild-api-backup/api -type d -not -path "netlify/prebuild-api-backup/api"); do
  cat > "$dir/route.ts" << EOF
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    message: "This API is not available in the static export. API calls should be directed to Netlify functions.",
    redirect: "/.netlify/functions/api${dir#netlify/prebuild-api-backup/api}"
  });
}

export function POST() {
  return Response.json({
    message: "This API is not available in the static export. API calls should be directed to Netlify functions.",
    redirect: "/.netlify/functions/api${dir#netlify/prebuild-api-backup/api}"
  });
}
EOF
  echo "Created placeholder for $dir/route.ts"
done

echo "Done preparing for Netlify build!" 