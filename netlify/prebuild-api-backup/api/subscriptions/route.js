import React from 'react';
export const dynamic = "force-static";

export function GET() {
  return Response.json({
    message,
    redirect: "/.netlify/functions/api/subscriptions"
  });
}

export function POST() {
  return Response.json({
    message,
    redirect: "/.netlify/functions/api/subscriptions"
  });
}
