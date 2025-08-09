import { UserRepository } from "../user/repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginInput, RegisterInput } from "../dto/auth";
import { User } from "@prisma/client";

export class AuthService {
  static async register(data: RegisterInput) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.create({
      email: data.email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return { user, token };
  }

  static async login(user: User) {
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    return { user, token };
  }
}
