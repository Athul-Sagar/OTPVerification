import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false); 

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (response) => console.log('reCAPTCHA solved'),
        'expired-callback': () => alert('reCAPTCHA expired. Try again.'),
      });
      window.recaptchaVerifier.render();
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true); 
      alert('OTP sent!');
    } catch (error) {
      console.error("Error during signInWithPhoneNumber", error);
      alert(error.message);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) return;

    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      alert("Phone Verified!");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      backgroundColor: '#f1f1f1',
    }}>
      <div style={{
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '20px',
        }}>Phone OTP Login</h2>

        {/* Phone Input Form */}
        {!isOtpSent && (
          <form onSubmit={handleSendOTP} style={{ marginBottom: '20px' }}>
            <input
              type="tel"
              placeholder="+91XXXXXXXXXX"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Send OTP
            </button>
          </form>
        )}

        <div id="recaptcha-container" style={{ marginTop: '10px' }}></div>

        {/* OTP Input Form */}
        {isOtpSent && (
          <form onSubmit={handleVerifyOTP} style={{ marginTop: '20px' }}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ddd',
                fontSize: '16px',
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Verify OTP
            </button>
          </form>
        )}

        {user && <h3 style={{ textAlign: 'center', marginTop: '20px', color: '#28a745' }}>Welcome! Phone verified.</h3>}
      </div>
    </div>
  );
}

export default PhoneAuth;
