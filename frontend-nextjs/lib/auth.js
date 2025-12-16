// lib/auth.js

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  return !!accessToken;
};

export const getAccessToken = () => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
};