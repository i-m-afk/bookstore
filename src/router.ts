import { Router } from 'express'
import { createBook, getBooks } from './handlers/book'

const router = Router()


/**
 * Books
 */
router.get('/book', getBooks)
router.post('/book', createBook)




export default router