import { Router } from 'express'
import { createBook, deleteBook, getBookById, getBooks, updateBook } from './handlers/book'
import { body, param, query } from 'express-validator'
import { createAuthor, deleteAuthor, getAuthor, getAuthorById, getAuthorByName, updateAuthor } from './handlers/author'
import { createReview, getReviewByBookId, getReviewByCustomer, updateReview } from './handlers/review'
import { createGenere, deleteGenere, getAllGeneres, getGenereById, getGenereByName, updateGenere } from './handlers/genere'

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
router.get('/author/?name', getAuthorByName)
router.get('/author/:id', param("id").isString(), getAuthorById)
router.post('/author', query("name").exists().isString(), createAuthor)
router.put('/author/:id', param("id").isString(), updateAuthor)
router.delete('/author/:id', param("id").isString(), deleteAuthor)

/**
 * Reviews
 */

router.post('/review', createReview)
router.get('/review', query("bookId").isString(), getReviewByBookId)             // if we want to get all reviews by bookId
router.get('/review', query("customerId").isString(), getReviewByCustomer)         // if we want to get all reviews by customerId
router.put('/review/:id', param("id").isString(), updateReview)                 // if we want to update a review

/**
 * Genres
 */

router.post('/genre', createGenere)
router.put('/genre/:id', updateGenere)
router.delete('/genre/:id', deleteGenere)
router.get('/genre/:id', getGenereById)
router.get('/genre', getAllGeneres) // if we want to get all generes
router.get('/genre/?name', getGenereByName) // if we want to get all generes by name


export default router