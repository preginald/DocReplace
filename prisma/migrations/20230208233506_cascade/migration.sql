-- DropForeignKey
ALTER TABLE `Input` DROP FOREIGN KEY `Input_docId_fkey`;

-- DropForeignKey
ALTER TABLE `Step` DROP FOREIGN KEY `Step_docId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_languageId_fkey`;

-- AddForeignKey
ALTER TABLE `Step` ADD CONSTRAINT `Step_docId_fkey` FOREIGN KEY (`docId`) REFERENCES `Doc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Input` ADD CONSTRAINT `Input_docId_fkey` FOREIGN KEY (`docId`) REFERENCES `Doc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
