import { Provider } from "@prisma/client";
import { AccountRepository } from "./repository";
import { UserRepository } from "../user/repository";

export class AccountService {
  static async findOrCreateAccount(
    email: string,
    provider: Provider,
    providerAccountId: string
  ) {
    const account = await AccountRepository.find(provider, providerAccountId);
    if (account) {
      return account.User;
    }
    const user = await UserRepository.findByEmail(email);
    let newUser;
    if (!user) {
      newUser = await UserRepository.create({
        email: email,
        password: "",
      });
    } else {
      newUser = user;
    }

    await AccountRepository.create(newUser.id, provider, providerAccountId);

    return newUser;
  }
  static async findByUserId(userId: string) {
    return await AccountRepository.findByUserAccounts(userId);
  }
}
