import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { UserRepository } from "../user/repository";
import passport from "passport";

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
