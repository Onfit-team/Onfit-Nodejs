/*
  Warnings:

  - You are about to drop the `location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `outfit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `outfit` DROP FOREIGN KEY `Outfit_userId_fkey`;

-- DropIndex
DROP INDEX `OutfitItem_outfitId_fkey` ON `OutfitItem`;

-- DropIndex
DROP INDEX `OutfitLike_outfitId_fkey` ON `OutfitLike`;

-- DropIndex
DROP INDEX `OutfitTag_outfitId_fkey` ON `OutfitTag`;

-- DropIndex
DROP INDEX `User_locationId_fkey` ON `User`;

-- DropIndex
DROP INDEX `Weather_locationId_fkey` ON `Weather`;

-- DropTable
DROP TABLE `location`;

-- DropTable
DROP TABLE `outfit`;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sido` VARCHAR(191) NOT NULL,
    `sigungu` VARCHAR(191) NOT NULL,
    `dong` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,

    UNIQUE INDEX `Location_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Outfit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `locationId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `weatherTempAvg` DOUBLE NULL,
    `feelsLikeTemp` DOUBLE NULL,
    `mainImage` VARCHAR(191) NULL,
    `memo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Weather` ADD CONSTRAINT `Weather_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outfit` ADD CONSTRAINT `Outfit_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Outfit` ADD CONSTRAINT `Outfit_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutfitItem` ADD CONSTRAINT `OutfitItem_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutfitTag` ADD CONSTRAINT `OutfitTag_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OutfitLike` ADD CONSTRAINT `OutfitLike_outfitId_fkey` FOREIGN KEY (`outfitId`) REFERENCES `Outfit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
