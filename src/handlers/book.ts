import { Prisma } from "@prisma/client"; // Import Prisma types
import prisma from "../db";

// get all books
export const getBooks = async (req, res) => {
    const { name, author } = req.query;
    const whereCondition: Prisma.BookWhereInput = {};
    // if name is given then search for books with that name
    if (name) {
        whereCondition.name = { contains: name, mode: "insensitive" } as Prisma.StringFilter;
    }

    // if author name is given then search for authorId and then search for books with that authorId
    if (author) {
        whereCondition.Author = {
            name: { contains: author, mode: "insensitive" } as Prisma.StringFilter,
        };
    }
    console.log(whereCondition)
    // whereCondition can have name or authorId
    const books = await prisma.book.findMany({
        where: whereCondition,
    });
    res.json({ books });
};

// get a book by id 
export const getBookById = async (req, res, next) => {
    const bookId = req.params.id;
    console.log(bookId)
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: bookId,
            },
        });
        res.json({ book });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

// create a new book
export const createBook = async (req, res, next) => {
    try {
        const book = await prisma.book.create({
            data: req.data,
        });
        res.json({ book });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

// delete a book
export const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;
        const book = await prisma.book.delete({
            where: {
                id: bookId,
            },
        });
        res.json({ book });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

// update a book
export const updateBook = async (req, res, next) => {
    try {
        const updated = await prisma.book.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        });
        res.json({ updated });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};