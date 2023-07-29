import { Router } from 'express'
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './handlers/book'
import { body, param, query } from 'express-validator'
import { createAuthor, getAuthor } from './handlers/author'
import { createReview, getReviewByBookId, getReviewByCustomer } from './handlers/review'

const router = Router()


/**
 * Books
 */
router.get('/book', query("name").isString(), query("author").isString(), getBooks)
router.get('/book/:id', param("id").isString(), getBookById)
router.post('/book', body("name").isString().exists(), createBook)
router.put('/book/:id', param("id").isString(), updateBook)
router.delete('/book/:id', param("id").isString(), deleteBook)




/**
 * Authors
 */

router.get('/author', getAuthor)
router.post('/author', query("name").exists().isString(), createAuthor)


/**
 * Reviews
 */

router.post('/review', createReview)
router.get('/review', query("bookId").isString(), getReviewByBookId)             // if we want to get all reviews by bookId
router.get('/review', query("customerId").isString(), getReviewByCustomer)         // if we want to get all reviews by customerId


export default router