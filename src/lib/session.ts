'use client';

import { auth } from './firebase';

export const setSession = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    // Store the token in a cookie
    document.cookie = `session=${token}; path=/; max-age=3600; samesite=strict`;
  }
};

export const clearSession = () => {
  document.cookie = 'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};
