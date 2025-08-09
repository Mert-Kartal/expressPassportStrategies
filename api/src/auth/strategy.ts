import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserRepository } from "../user/repository";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import passport from "passport";

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
          return done(null, false, { message: "Invalid Credentials." });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return done(null, false, { message: "Invalid Credentials." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (jwt_payload, done) => {
      const user = await UserRepository.show(jwt_payload.id);
      if (!user) {
        return done(null, false, { message: "Invalid Credentials." });
      }
      return done(null, user);
    }
  )
);
