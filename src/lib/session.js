'use client';

import { auth } from './firebase';

export const setSession = async () => {
  const user = auth.currentUser;
  if (user) {
    const idToken = await user.getIdToken();
    
    // Call the session API to create a proper session cookie
    try {
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to set session');
      }
      
      // The session cookie is now set by the API
      return true;
    } catch (error) {
      console.error('Error setting session:', error);
      return false;
    }
  }
  return false;
};

export const clearSession = async () => {
  try {
    // Call the logout API to revoke the session
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    // Clear local storage and session storage
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    return true;
  } catch (error) {
    console.error('Error clearing session:', error);
    
    // Fallback to client-side cookie clearing if the API fails
    document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure';
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    return false;
  }
};
