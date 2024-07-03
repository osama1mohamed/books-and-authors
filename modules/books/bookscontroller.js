import Book from '../../models/books/books.js'
import Author from '../../models/authors/authors.js'

export const createBook = async (req, res) => {
  const { title, content, author, publishedDate } = req.body
  try {
    const newBook = await Book.create({
      title,
      content,
      author,
      publishedDate,
    })
    await Author.findByIdAndUpdate(author, { $push: { books: { _id: newBook._id, title: newBook.title } } }, { new: true })
    res.status(201).json(newBook)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const getBooks = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const searchQuery = req.query.q
  try {
    let query = {}
    if (searchQuery) {
      query = {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    }
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('author', 'name')

    res.json(books)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const getBookById = async (req, res) => {
  const { id } = req.params
  try {
    const book = await Book.findById(id).populate('author', 'name')
    if (!book) {
      return res.status(404).json({ error: 'Book not found' })
    }
    res.json(book)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const updateBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!book) {
      return res.status(404).send()
    }
    res.status(200).send(book)
  } catch (e) {
    res.status(400).send(e)
  }
}

export const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) {
      return res.status(404)send("book is not found")
    }
    res.status(200).sendsend("book is deleted")
  } catch (e) {
    res.status(500).send(e)
  }
}
