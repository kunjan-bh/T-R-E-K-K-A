"use client";
import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, signup } from '@/lib/api';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    isFromNepal: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await login(
          formData.email, 
          formData.password, 
          formData.rememberMe
        );
        console.log('Login successful:', response);
        router.push('/dashboard');
      } else {
        // Signup
        const response = await signup(
          formData.email, 
          formData.password, 
          formData.isFromNepal
        );
        console.log('Signup successful:', response);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('Auth error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isLogin ? "login" : "signup"}`}>
      <div className="section1">
        <div className={`${isLogin ? "login-head" : "signup-head"}`}>
          <div className="logo">
            <PageTransition href="/">
              <div>
                <div className="logo-img">
                  <img src="/mount-b.png" alt="" />
                </div>
                <span>Trekya</span>
              </div>
            </PageTransition>
          </div>
          
          <span className={`${isLogin ? "login-span" : "hide"}`}>
            Don't have an account?
            <Link href="#" onClick={() => setIsLogin(false)} className="spiral-text">
              <span>S</span><span>i</span><span>g</span><span>n</span>
              <span>&nbsp;</span><span>u</span><span>p</span><span>!</span>
            </Link>
          </span>

          <span className={`${isLogin ? "hide" : "signup-span"}`}>
            Already have an account?
            <Link href="#" onClick={() => setIsLogin(true)} className="spiral-text">
              <span> L</span><span>o</span><span>g</span><span>&nbsp;</span>
              <span>I</span><span>n</span><span>!</span>
            </Link>
          </span>
        </div>

        <div className={`${isLogin ? "login-content" : "signup-content"}`}>
          <h1 className={`${isLogin ? "" : "hide"}`}>Welcome Back</h1>
          <h1 className={`${isLogin ? "hide" : ""}`}>Get Ready For Nepal</h1>
          <span className={`${isLogin ? "tag" : "hide"}`}>Login to your account</span>
          <span className={`${isLogin ? "hide" : "tag"}`}>Create an account</span>

          {/* Social Login Buttons */}
          <div className="social-icon">
            <Link href="" className="button-login">
              <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
              </svg>
              Google
            </Link>
            <Link href="/auth/facebook" className="button-login flex items-center gap-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded shadow hover:bg-blue-600 hover:text-white transition">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.324V1.325C24 .593 23.406 0 22.675 0z" />
              </svg>
              <span>Facebook</span>
            </Link>
          </div>

          <span className='login-faint'>----------------or continue with----------------</span>

          {/* Error Message */}
          {error && (
            <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                <g data-name="Layer 3" id="Layer_3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                </g>
              </svg>
              <input 
                name="email"
                placeholder="Enter your Email" 
                className="input" 
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex-column">
              <label>Password </label>
            </div>
            <div className="inputForm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
              </svg>
              <input 
                name="password"
                placeholder="Enter your Password" 
                className="input" 
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>

            {/* Remember Me / Forgot Password */}
            <div className="flex-row">
              <div className='check-btn'>
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me </label>
              </div>
              <span className={`${isLogin ? "span" : "hide"}`}>Forgot password?</span>
            </div>

            {/* I am from Nepal checkbox (only for signup) */}
            <div className={`${isLogin ? "hide" : "flex-row"}`}>
              <div className='check-btn'>
                <input 
                  type="checkbox" 
                  id="isFromNepal" 
                  name="isFromNepal"
                  checked={formData.isFromNepal}
                  onChange={handleChange}
                />
                <label htmlFor="isFromNepal">I am from Nepal.</label>
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className={`${isLogin ? "button-submit" : "hide"}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
            
            <button 
              type="submit" 
              className={`${isLogin ? "hide" : "button-submit"}`}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>

      <div className="section2">
        <div className="blur-text">
          <p className={`${isLogin ? "" : "hide"}`}>
            Nepal is a land of breathtaking beauty, offering majestic mountains, serene landscapes, rich culture, diverse wildlife, and spiritual serenity.
          </p>
          <img src="/microscope.png" alt="loading" className={`${isLogin ? "hide" : ""}`} />
          <p className={`${isLogin ? "hide" : ""}`}>
            Best places from mountains to green hills
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;