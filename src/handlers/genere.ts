import prisma from "../db";
import { isAdmin } from "../modules/middleware";

export const createGenere = async (req, res, next) => {
    const isAdminUser = await isAdmin(req);
    if (!isAdminUser) {
        return res.status(401).json({ message: "not authorized" });
    }
    try {
        const genere = await prisma.generes.create({
            data: req.body,
        });
        res.json({ genere });

    } catch (e) {
        console.log(e)
        e.type = "input";
        next(e);
    }
}

// get genere by id
export const getGenereById = async (req, res, next) => {
    const genereId = req.params.id;
    console.log(genereId)
    try {
        const genere = await prisma.generes.findUnique({
            where: {
                genere_id: genereId,
            },
        });
        res.json({ genere });
    } catch (e) {
        e.type = "input";
        next(e);
    }
}

// get generes by name
export const getGenereByName = async (req, res) => {
    const { name } = req.query;
    const condition = name ? { name: { contains: name } } : {};

    const generes = await prisma.generes.findMany({ where: condition });
    res.json({ generes });
};


// update a genere

export const updateGenere = async (req, res, next) => {
    const isAdminUser = await isAdmin(req);
    if (!isAdminUser) {
        return res.status(401).json({ message: "not authorized" });
    }
    try {
        const updatedGenere = await prisma.generes.update({
            where: {
                genere_id: req.params.id,
            },
            data: req.body,
        });
        res.json({ updatedGenere });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};


// delete a genere

export const deleteGenere = async (req, res, next) => {
    const isAdminUser = await isAdmin(req);
    if (!isAdminUser) {
        return res.status(401).json({ message: "not authorized" });
    }
    try {
        const deletedGenere = await prisma.generes.delete({
            where: {
                genere_id: req.params.id,
            },
        });
        res.json({ deletedGenere });
    } catch (e) {
        e.type = "input";
        next(e);
    }
};

// get all generes

export const getAllGeneres = async (req, res, next) => {
    try {
        const generes = await prisma.generes.findMany();
        res.json({ generes });
    } catch (e) {
        e.type = "input";
        next(e);
    }
}