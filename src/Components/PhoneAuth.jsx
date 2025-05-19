
import { auth } from '../Firebase/firebase.js';
import React, { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function PhoneAuth() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  // Initialize reCAPTCHA
  useEffect(() => {
    const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA verified');
      }
    });
    setRecaptchaVerifier(verifier);
    return () => verifier.clear();
  }, []);

  // Handle sending OTP
  const handleSendOtp = async () => {
    setError('');
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
      alert('OTP sent successfully!');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    setError('');
    try {
      await confirmationResult.confirm(otp);
      alert('Phone number verified successfully!');
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Phone OTP Verification</h2>
      <div id="recaptcha-container"></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!confirmationResult ? (
        <div>
          <label>
            Phone Number (with country code, e.g., +1234567890):
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </label>
          <button
            onClick={handleSendOtp}
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <label>
            Enter OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              style={{ width: '100%', padding: '8px', margin: '10px 0' }}
            />
          </label>
          <button
            onClick={handleVerifyOtp}
            style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}

export default PhoneAuth;