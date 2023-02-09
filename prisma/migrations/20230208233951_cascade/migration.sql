-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_languageId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_stepId_fkey`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_stepId_fkey` FOREIGN KEY (`stepId`) REFERENCES `Step`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
