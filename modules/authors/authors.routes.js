import express from 'express'
import {
  createAuthor,
  getAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById
} from './authorscontroller.js'
const router = express.Router()
router.post('/', createAuthor)
router.get('/', getAuthors)
router.get('/:id', getAuthorById)
router.patch('/:id', updateAuthorById)
router.delete('/:id', deleteAuthorById)
export default router