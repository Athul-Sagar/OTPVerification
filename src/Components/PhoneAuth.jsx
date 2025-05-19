import React, { useState } from 'react';
import { auth } from '../Firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function PhoneAuth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);

  const setUpRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
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
    <div style={{ padding: 20 }}>
      <h2>Phone OTP Login</h2>
      <form onSubmit={handleSendOTP}>
        <input type="tel" placeholder="+91XXXXXXXXXX" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Send OTP</button>
      </form>
      <div id="recaptcha-container" style={{ marginTop: 10 }}></div>

      <form onSubmit={handleVerifyOTP}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value)} />
        <button type="submit">Verify OTP</button>
      </form>

      {user && <h3>Welcome! Phone verified.</h3>}
    </div>
  );
}

export default PhoneAuth;
