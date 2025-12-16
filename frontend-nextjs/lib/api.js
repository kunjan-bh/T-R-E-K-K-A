// lib/api.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/auth';

// Helper function to get tokens from storage
const getTokens = () => {
  if (typeof window === 'undefined') return null;
  
  return {
    access: localStorage.getItem('access_token') || sessionStorage.getItem('access_token'),
    refresh: localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token'),
  };
};

// Helper function to store tokens
const storeTokens = (tokens, rememberMe) => {
  if (typeof window === 'undefined') return;
  
  if (rememberMe) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  } else {
    sessionStorage.setItem('access_token', tokens.access);
    sessionStorage.setItem('refresh_token', tokens.refresh);
  }
};

// Helper function to clear tokens
const clearTokens = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
};

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === 'undefined') return false;
  
  const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  return !!accessToken;
}

// Signup function
export async function signup(email, password, isFromNepal = false) {
  try {
    const response = await fetch(`${API_URL}/signup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        password2: password,
        is_from_nepal: isFromNepal,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || JSON.stringify(data));
    }

    // Auto-login after signup - store tokens
    storeTokens(data.tokens, true);

    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

// Login function
export async function login(email, password, rememberMe = false) {
  try {
    const response = await fetch(`${API_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        remember_me: rememberMe,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Store tokens
    storeTokens(data.tokens, rememberMe);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// Logout function
export async function logout() {
  try {
    const tokens = getTokens();
    
    if (tokens.refresh) {
      await fetch(`${API_URL}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({
          refresh: tokens.refresh,
        }),
      });
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear tokens even if API call fails
    clearTokens();
  }
}

// Get current user
export async function getCurrentUser() {
  try {
    const tokens = getTokens();
    
    if (!tokens.access) {
      throw new Error('No access token');
    }

    const response = await fetch(`${API_URL}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to get user');
    }

    return data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
}

// Refresh access token
export async function refreshAccessToken() {
  try {
    const tokens = getTokens();
    
    if (!tokens.refresh) {
      throw new Error('No refresh token');
    }

    const response = await fetch(`${API_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: tokens.refresh,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    // Update access token
    const rememberMe = !!localStorage.getItem('access_token');
    if (rememberMe) {
      localStorage.setItem('access_token', data.access);
    } else {
      sessionStorage.setItem('access_token', data.access);
    }

    return data.access;
  } catch (error) {
    console.error('Refresh token error:', error);
    clearTokens();
    throw error;
  }
}