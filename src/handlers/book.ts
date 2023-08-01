import { Prisma } from "@prisma/client"; // Import Prisma types
import prisma from "../db";
import { isAdmin } from "../modules/middleware";

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
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })  // if not admin then return
    }

    try {
        const book = await prisma.book.create({
            data: req.body,
        });
        res.json({ book });

    } catch (e) {
        console.log(e)
        e.type = "input";
        next(e);
    }
};

// delete a book
export const deleteBook = async (req, res, next) => {
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })  // if not admin then return
    }
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
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })  // if not admin then return
    }
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