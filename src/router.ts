import { Router } from 'express'
import { createBook, getBooks } from './handlers/book'
import { body, param, query } from 'express-validator'
import { createAuthor, getAuthor } from './handlers/author'
import { createReview } from './handlers/review'

const router = Router()


/**
 * Books
 */
router.get('/book', query("name").isString(), query("author").isString(), getBooks)
router.post('/book', body("name").isString().exists(), createBook)




/**
 * Authors
 */

router.get('/author', getAuthor)
router.post('/author', query("name").exists().isString(), createAuthor)


/**
 * Reviews
 */

router.post('/review', createReview)


export default router