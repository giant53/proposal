/*
  Warnings:

  - You are about to drop the column `createdById` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sentToUserId` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secretHash]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipientId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aiModel` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('FREE', 'PREMIUM', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE', 'INACTIVE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AuditAction" ADD VALUE 'SUBSCRIPTION_CREATED';
ALTER TYPE "AuditAction" ADD VALUE 'SUBSCRIPTION_UPDATED';
ALTER TYPE "AuditAction" ADD VALUE 'SUBSCRIPTION_CANCELLED';
ALTER TYPE "AuditAction" ADD VALUE 'CREDITS_RESET';
ALTER TYPE "AuditAction" ADD VALUE 'PAYMENT_RECEIVED';

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_createdById_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_sentToUserId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdById",
DROP COLUMN "message",
DROP COLUMN "sentToUserId",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "recipientId" TEXT NOT NULL,
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proposal" ADD COLUMN     "aiModel" TEXT NOT NULL,
ADD COLUMN     "creditCost" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "proposalFont" TEXT DEFAULT 'font-dancing-script',
ADD COLUMN     "secretHash" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "currentPeriodStart" TIMESTAMP(3),
ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "defaultPaymentId" TEXT,
ADD COLUMN     "lastCreditReset" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "remainingCredits" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'INACTIVE',
ADD COLUMN     "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "status" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentIntentId" TEXT,
    "tier" "SubscriptionTier" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "interval" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "features" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "stripePriceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnsubscribedEmail" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnsubscribedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Transaction_userId_idx" ON "Transaction"("userId");

-- CreateIndex
CREATE INDEX "Transaction_status_idx" ON "Transaction"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_tier_key" ON "SubscriptionPlan"("tier");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_tier_idx" ON "SubscriptionPlan"("tier");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_isActive_idx" ON "SubscriptionPlan"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "UnsubscribedEmail_email_key" ON "UnsubscribedEmail"("email");

-- CreateIndex
CREATE INDEX "UnsubscribedEmail_email_idx" ON "UnsubscribedEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_secretHash_key" ON "Proposal"("secretHash");

-- CreateIndex
CREATE INDEX "User_subscriptionTier_idx" ON "User"("subscriptionTier");

-- CreateIndex
CREATE INDEX "User_subscriptionStatus_idx" ON "User"("subscriptionStatus");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
