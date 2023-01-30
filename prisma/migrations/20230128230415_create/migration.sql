-- CreateTable
CREATE TABLE `Input` (
    `id` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `docId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Input` ADD CONSTRAINT `Input_docId_fkey` FOREIGN KEY (`docId`) REFERENCES `Doc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
