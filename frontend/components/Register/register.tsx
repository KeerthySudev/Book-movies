// components/GoogleSignInButton.tsx
'use client';

import GoogleButton from 'react-google-button';

const GoogleSignInButton = () => {
  const handleClick = () => {
    window.location.href = 'http://localhost:5000/api/home/google'; 
  };
  // const redirectToGoogle = () => {
  //   const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  //   const redirectUri = 'http://localhost:5000/api/home/google/callback'; // Match this with your backend
  //   const scope = 'profile email';
  //   const responseType = 'code';
    
  //   const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
    
  //   window.location.href = authorizationUrl;
  // };

  return (
    <GoogleButton onClick={handleClick} />
  );
};

export default GoogleSignInButton;
