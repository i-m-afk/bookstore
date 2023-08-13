import prisma from "../db"

// create a review
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

// update a review
export const updateReview = async (req, res, next) => {

    const custId = req.user.id;
    const review = await prisma.review.findUnique({
        where: {
            review_id: req.params.id,
        },
        select: {
            customerId: custId,
            Customers: true,
        }
    })
    if (review == null) {
        res.status(404)
        res.json({ message: 'review not found' })
        return
    }
    try {
        const updatedReview = await prisma.review.update({
            where: {
                review_id: req.params.id,
            },
            data: req.body,
        })
        res.json({ updatedReview })
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
    return reviews;
}


// delete a review
export const deleteReview = async (req, res, next) => {
    // check if the review exists
    const custId = req.user.id;
    const review = await prisma.review.findUnique({
        where: {
            review_id: req.params.id,
        },
        select: {
            customerId: custId,
            Customers: true,
        }
    })
    if (review == null) {
        res.status(404)
        res.json({ message: 'review not found' })
        return
    }

    try {
        const deletedReview = await prisma.review.delete({
            where: {
                review_id: req.params.id,
            },
        })
        res.json({ deletedReview })
    }
    catch (e) {
        e.type('input')
        console.log(e)
        next(e)
    }
}