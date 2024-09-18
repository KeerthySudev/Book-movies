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
  // req.session.user = {
  //   email: req.user.email,
  //   role: req.user.role
  // };
  console.log('mail' ,req.user.email);
  console.log('id' ,req.user._id);
  const userRole = req.user.role;

  if (userRole === 'admin') {
    res.redirect('http://localhost:3000/admin/movie');
  }  else {
    res.redirect('http://localhost:3000/user/movies');
  }
});



router.get('/logout', (req, res, next) => {
  // Passport's logout method
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    // Destroy the session to clear all session data
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.status(200).json({ success: true, message: 'Logged out successfully' });    });
  });
});


// router.get('/logout', (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.clearCookie('auth'); // Optionally clear any authentication cookies
//     res.redirect('http://localhost:3000'); // Redirect to home or login page
//   });
// });


router.get('/session', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.json(req.user); 
});

module.exports = router;
