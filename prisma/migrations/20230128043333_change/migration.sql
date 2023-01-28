/*
  Warnings:

  - A unique constraint covering the columns `[slug,userId]` on the table `Doc` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Doc_slug_key` ON `Doc`;

-- CreateIndex
CREATE UNIQUE INDEX `Doc_slug_userId_key` ON `Doc`(`slug`, `userId`);
