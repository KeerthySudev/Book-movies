// backend/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/home/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Find or create a user in the database
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      }).save();
    } else {
      // Update user details if needed
      user.name = profile.displayName;
      user.email = profile.emails[0].value;
      await user.save();
    }
    // console.log( profile.emails[0].value);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}));


passport.serializeUser((user, done) => {
  console.log('Serialized user ID:', user.id);
  done(null,user.id);
});

passport.deserializeUser(async (obj, done) => {
  const userId = obj.id || obj;  

  try {
    const user = await User.findById(userId); 
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

