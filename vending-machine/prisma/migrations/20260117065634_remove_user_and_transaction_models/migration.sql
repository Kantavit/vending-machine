/*
  Warnings:

  - You are about to drop the `PaymentInput` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PaymentTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PaymentInput` DROP FOREIGN KEY `PaymentInput_paymentTransactionId_fkey`;

-- DropForeignKey
ALTER TABLE `PaymentTransaction` DROP FOREIGN KEY `PaymentTransaction_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionItem` DROP FOREIGN KEY `TransactionItem_paymentTransactionId_fkey`;

-- DropForeignKey
ALTER TABLE `TransactionItem` DROP FOREIGN KEY `TransactionItem_productId_fkey`;

-- DropTable
DROP TABLE `PaymentInput`;

-- DropTable
DROP TABLE `PaymentTransaction`;

-- DropTable
DROP TABLE `TransactionItem`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Money` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `type` ENUM('COIN', 'BILL') NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
