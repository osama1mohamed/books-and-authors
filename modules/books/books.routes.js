import express from 'express'
import {
  createBook,
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById
} from './bookscontroller.js'
const router = express.Router()
router.post('/', createBook)
router.get('/', getBooks)
router.get('/:id', getBookById)
router.patch('/:id', updateBookById)
router.delete('/:id', deleteBookById)
export default router