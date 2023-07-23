// get all books

import { Prisma } from '@prisma/client'; // Import Prisma types
import prisma from '../db';

export const getBooks = async (req, res) => {
    const { name, author, genre } = req.query;
    const whereCondition: Prisma.BookWhereInput = {};

    if (name) {
        whereCondition.name = { contains: name } as Prisma.StringFilter;
    }

    if (author) {
        whereCondition.Author = { contains: author } as Prisma.AuthorWhereInput;
    }

    const books = await prisma.book.findMany({
        where: whereCondition,
    });

    res.json({ books });
};




export const createBook = async (req, res) => {
    const data = req.body
    const book = await prisma.book.create({
        data: data
    })
    res.json({ book })
}