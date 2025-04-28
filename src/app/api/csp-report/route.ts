import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import { getFirestore } from '@/lib/firebase-admin';

// Initialize Firestore
const db = getFirestore();

export async function POST(req: NextRequest) {
  try {
    let reportData;
    
    // Try to parse the CSP report data
    try {
      const body = await req.json();
      
      // CSP reports use either 'csp-report' or direct format
      reportData = body['csp-report'] || body;
    } catch (error) {
      console.error('Error parsing CSP report:', error);
      return NextResponse.json({ error: 'Invalid report format' }, { status: 400 });
    }
    
    // Basic validation
    if (!reportData) {
      return NextResponse.json({ error: 'No report data found' }, { status: 400 });
    }
    
    // Log the CSP violation
    console.warn('CSP Violation:', JSON.stringify(reportData, null, 2));
    
    // Store in Firestore for analysis
    try {
      await db.collection('csp-violations').add({
        reportData,
        userAgent: req.headers.get('user-agent') || 'unknown',
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        ip: req.headers.get('x-forwarded-for') || 'unknown',
      });
    } catch (dbError) {
      console.error('Error saving CSP report to database:', dbError);
      // Continue anyway - don't fail the request
    }
    
    // Always return success - we don't want to bother users with CSP errors
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing CSP report:', error);
    // Always return success even on errors to ensure browser doesn't retry
    return NextResponse.json({ success: true });
  }
} 