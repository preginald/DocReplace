/*
  Warnings:

  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `output` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NOT NULL;
