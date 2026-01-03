"use client";
import React, { useState } from 'react';
import { API_URL } from '@/lib/api';

const ForgotPassword = ({ onClose }) => {
  const [step, setStep] = useState('enter-email'); // 'enter-email' | 'verify-otp' | 'reset-password'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetToken, setResetToken] = useState('');

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/send-otpV2/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('verify-otp');
      } else {
        setError(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError(err.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/verify-otp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, purpose: "resetReq" }),
      });
      const data = await res.json();
      if (data.success) {
        setStep('reset-password');
        setResetToken(data.reset_token);
      } else {
        setError('Invalid or expired OTP');
      }
    } catch (err) {
      setError(err.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_password: newPassword, resetToken }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Password reset successfully! You can login now.');
        setStep('enter-email');
        setEmail('');
        setOtp('');
        setNewPassword('');
        setResetToken('');
      } else {
        setError(data.error || 'Failed to reset password');
      }
    } catch (err) {
      setError(err.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-overlay">
      <div className="overlay-content">
        <button onClick={onClose} className='close-btn'>X</button>
        <h2>Forgot Password</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {step === 'enter-email' && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOtp} disabled={loading} className='forgot-btn'>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </>
        )}

        {step === 'verify-otp' && (
          <>
            <p>OTP sent to <span>{email}</span></p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp} disabled={loading} className='forgot-btn'>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {step === 'reset-password' && (
          <>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={resetPassword} disabled={loading} className='forgot-btn'>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
