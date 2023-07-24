import prisma from "../db"

// get all authors or get by name
export const getAuthor = async (req, res) => {
    const { name } = req.query;
    const condition = name ? { name: { contains: name } } : {};

    const authors = await prisma.author.findMany({ where: condition });
    res.json({ authors });
};




// create a author
export const createAuthor = async (req, res, next) => {
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

