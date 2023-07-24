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