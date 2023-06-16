const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');

module.exports = () => {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:3065/auth/github/callback"
  }, async (accessToken, refreshToken, profile, done) => {
    console.log('github profile', profile);
    try {
      const exUser = await User.findOne({
        where: { snsId: profile.id, provider: 'github' },
      });
      if (exUser) {
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile.emails,
          nickname: profile.username,
          password: profile.password,
          snsId: profile.id,
          provider: 'github',
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
