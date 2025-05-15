const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Set up a development server for local testing
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: '../../' });
const handle = app.getRequestHandler();

// This function handles all API calls through Netlify functions
exports.handler = async function(event, context) {
  // Wait until Next.js is initialized
  await app.prepare();
  
  try {
    // Parse the path from the Netlify event
    const path = event.path.replace('/.netlify/functions/api', '/api');
    const { pathname, query } = parse(path, true);
    
    // Create a mock request and response
    return await new Promise((resolve, reject) => {
      const req = {
        method: event.httpMethod,
        headers: event.headers,
        url: path,
        body: event.body ? JSON.parse(event.body) : undefined,
        query: query,
        cookies: parseCookies(event.headers.cookie || ''),
      };
      
      const res = {
        statusCode: 200,
        headers: {},
        body: '',
        setHeader: (name, value) => {
          res.headers[name.toLowerCase()] = value;
        },
        getHeader: (name) => res.headers[name.toLowerCase()],
        end: (body) => {
          res.body = body;
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: res.body,
          });
        },
        write: (chunk) => {
          res.body += chunk;
        },
        writeHead: (status, headers) => {
          res.statusCode = status;
          if (headers) res.headers = { ...res.headers, ...headers };
        },
      };
      
      // Process the API request through Next.js
      handle(req, res)
        .catch(error => {
          console.error('Error handling request:', error);
          reject({
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
          });
        });
    });
  } catch (error) {
    console.error('Unhandled error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};

// Helper function to parse cookies
function parseCookies(cookieString) {
  const cookies = {};
  if (cookieString) {
    cookieString.split(';').forEach(cookie => {
      const parts = cookie.split('=');
      const name = parts[0].trim();
      const value = parts.slice(1).join('=').trim();
      if (name) cookies[name] = value;
    });
  }
  return cookies;
} 