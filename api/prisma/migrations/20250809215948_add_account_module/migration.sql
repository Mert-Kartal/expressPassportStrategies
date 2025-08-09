-- CreateEnum
CREATE TYPE "public"."Provider" AS ENUM ('GOOGLE', 'GITHUB', 'FACEBOOK');

-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "public"."Provider" NOT NULL,
    "providerAccountId" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
