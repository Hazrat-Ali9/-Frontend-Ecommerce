import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { sendEmailVerification } from 'firebase/auth';

const Verify = () => {
    const [user] = useAuthState(auth);

  const handleSendVerificationEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Verification email sent!');
      })
      .catch((error) => {
        alert(error.message);
      });
  };
    return (
        <div>
           <h1>Verify Your Email</h1>
      <p>Please verify your email address to continue.</p>
      <button onClick={handleSendVerificationEmail} className='btn btn-primary'>
        Resend Verification Email
      </button> 
        </div>
    );
};

export default Verify;