import prisma from "../db"
import { isAdmin } from "../modules/middleware"

// get all authors or get by name
export const getAuthor = async (req, res) => {
    const { name } = req.query;
    const condition = name ? { name: { contains: name } } : {};

    const authors = await prisma.author.findMany({ where: condition });
    res.json({ authors });
};

// get a author by id
export const getAuthorById = async (req, res, next) => {
    const authorId = req.params.id;
    try {
        const author = await prisma.author.findUnique({
            where: {
                id: authorId,
            },
        });
        res.json({ author });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

// get a author by name
export const getAuthorByName = async (req, res, next) => {
    const authorName = req.params.name;
    try {
        const author = await prisma.author.findMany({
            where: {
                name: {
                    contains: authorName,
                    mode: "insensitive",
                }
            }
        });
        res.json({ author });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};


// create a author
export const createAuthor = async (req, res, next) => {
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })
    }
    try {
        const data = req.body
        const author = await prisma.author.create({
            data: data
        })
        res.json({ author })
    }
    catch (e) {
        e.type('input')
        console.log(e)
        next(e)
    }
}

// update a author
export const updateAuthor = async (req, res, next) => {
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })
    }
    try {
        const updatedAuthor = await prisma.author.update({
            where: {
                id: req.params.id,
            },
            data: req.body,
        })
        res.json({ updatedAuthor })
    }
    catch (e) {
        e.type('input')
        console.log(e)
        next(e)
    }
}

// delete a author
export const deleteAuthor = async (req, res, next) => {
    const isAdminUser = await isAdmin(req)
    if (!isAdminUser) {
        return res.status(401).json({ message: 'not authorized' })
    }
    try {
        const authorId = req.params.id;
        const author = await prisma.author.delete({
            where: {
                id: authorId,
            },
        });
        res.json({ author });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

