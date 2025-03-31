'use client';

import { auth } from './firebase';

export const setSession = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    document.cookie = `session=${token}; path=/; max-age=3600; samesite=strict; secure`;
  }
};

export const clearSession = () => {
  // Clear all auth-related cookies
  document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure';
  // Clear any other auth-related state here
  localStorage.removeItem('user');
  sessionStorage.clear();
};
