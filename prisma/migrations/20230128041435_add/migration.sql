/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Doc` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Doc` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Doc_title_key` ON `Doc`;

-- AlterTable
ALTER TABLE `Doc` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Doc_slug_key` ON `Doc`(`slug`);
