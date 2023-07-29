import prisma from "../db"

export const createReview = async (req, res, next) => {
    try {
        let data = req.body
        data.customerId = req.user.id
        data.bookId = req.body.bookId

        const review = await prisma.review.create({
            data: data
        })
        res.json({ review })
    }
    catch (e) {
        e.type('input')
        console.log(e)
        next(e)
    }
}

// get all reviews  by bookId
export const getReviewByBookId = async (req, res) => {
    const { bookId } = req.query;
    const condition = bookId ? { bookId: { contains: bookId } } : {};
    const reviews = await prisma.review.findMany({
        where: condition,
    });
    res.json({ reviews });
}

// get all reviews by customerId
export const getReviewByCustomer = async (req, res) => {
    const { customerId } = req.query;
    const condition = customerId ? { customerId: { contains: customerId } } : {};
    const reviews = await prisma.review.findMany({
        where: condition,
    });
    res.json({ reviews });
}