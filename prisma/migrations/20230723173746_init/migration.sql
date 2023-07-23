-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "photo" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "cover" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/3532/3532144.png';

-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png';
