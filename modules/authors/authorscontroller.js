import Author from '../../models/authors/authors.js'

export const createAuthor = async (req, res) => {
  const { name, bio, birthDate } = req.body
  try {
    const newAuthor = await Author.create({
      name,
      bio,
      birthDate,
    })
    res.status(201).json(newAuthor)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const getAuthors = async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const searchQuery = req.query.q
  try {
    let query = {}
    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { bio: { $regex: searchQuery, $options: 'i' } },
        ],
      }
    }
    const authors = await Author.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('books')
    res.json(authors)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const getAuthorById = async (req, res) => {
  const { id } = req.params
  try {
    const author = await Author.findById(id).populate('books')
    if (!author) {
      return res.status(404).json({ error: 'Author not found' })
    }
    res.json(author)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
}
export const updateAuthorById = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!author) {
      return res.status(404).send()
    }
    res.status(200).send(author)
  } catch (e) {
    res.status(400).send(e)
  }
}
export const deleteAuthorById = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
    if (!author) {
      return res.status(404).send("author is not found")
    }
    res.status(200).send("author is deleted")
  } catch (e) {
    res.status(500).send(e)
  }
}
