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
        const isPasswordValid = await bcrypt.compare(
          password,
          user.password as string
        );
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
