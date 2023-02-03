/*
  Warnings:

  - Added the required column `status` to the `Doc` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Doc` ADD COLUMN `status` ENUM('publish', 'future', 'draft', 'pending', 'private', 'trash', 'inherit', 'extend', 'custom', 'archived') NOT NULL;
