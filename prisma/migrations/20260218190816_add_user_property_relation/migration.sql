/*
  Warnings:

  - You are about to drop the column `heating_cooling` on the `properties` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `properties` table. All the data in the column will be lost.
  - Added the required column `userId` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" DROP COLUMN "heating_cooling",
DROP COLUMN "short_description",
ADD COLUMN     "klima" TEXT,
ADD COLUMN     "parno" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
