/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `phoneNumber` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `name` VARCHAR(500) NOT NULL,
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `name` VARCHAR(500) NOT NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `role` VARCHAR(200) NOT NULL DEFAULT 'USER',
    MODIFY `phoneNumber` VARCHAR(10) NOT NULL;
