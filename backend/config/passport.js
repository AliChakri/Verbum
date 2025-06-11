const jwt = require('jsonwebtoken');

passport.use(new googleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
        let user = await UserModel.findOne({ googleId: profile.id });

        if (!user) {
            user = await UserModel.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Attach the token to the user object
        user._doc.token = token;

        done(null, user);
        } catch (error) {
        done(error, null);
        }
    }
    ));
