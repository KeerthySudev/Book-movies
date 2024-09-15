// backend/routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();
const { emailVerify} = require('../controllers/home/homeController');
const { verifyOtp} = require('../controllers/home/homeController');


router.post('/emailVerify', emailVerify);
router.post('/verifyOtp', verifyOtp);

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/register/profile');
});


// router.get('/google/callback', async (req, res) => {
//   const authorizationCode = req.query.code;
//   const clientId = process.env.GOOGLE_CLIENT_ID;
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
//   const redirectUri = 'http://localhost:5000/api/home/google/callback';
  
//   try {
//     // Exchange authorization code for access token
//     const response = await axios.post('https://oauth2.googleapis.com/token', {
//       code: authorizationCode,
//       client_id: clientId,
//       client_secret: clientSecret,
//       redirect_uri: redirectUri,
//       grant_type: 'authorization_code',
//     });
    
//     const accessToken = response.data.access_token;
    
//     // Fetch user profile information
//     const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
    
//     const userProfile = profileResponse.data;
    
//     // Handle user profile (create or update user in database, manage session)
//     // Example: Find or create user and manage session
//     // const user = await User.findOneAndUpdate({ googleId: userProfile.id }, { name: userProfile.name, email: userProfile.email }, { upsert: true, new: true });
    
//     // Example: Create session or token
//     req.session.user = userProfile; // Save user profile to session
//     res.redirect('http://localhost:3000/register/profile'); // Redirect after login
    
//   } catch (error) {
//     console.error('Error exchanging authorization code:', error);
//     res.redirect('http://localhost:3000'); // Redirect on error
//   }
// });

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('http://localhost:3000');
});

router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.json(req.user); // Send user info as JSON
});

module.exports = router;
