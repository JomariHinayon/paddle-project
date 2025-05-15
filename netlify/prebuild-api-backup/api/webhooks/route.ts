export const dynamic = "force-static";

export function GET() {
  return Response.json({
    message: "This API is not available in the static export. API calls should be directed to Netlify functions.",
    redirect: "/.netlify/functions/api/webhooks"
  });
}

export function POST() {
  return Response.json({
    message: "This API is not available in the static export. API calls should be directed to Netlify functions.",
    redirect: "/.netlify/functions/api/webhooks"
  });
}
