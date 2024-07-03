import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import bookRouter from './modules/books/books.routes.js'
import authorRouter from './modules/authors/authors.routes.js'

const app = express()
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/book-author-api')
.then(console.log("database is connected"))
.catch((err) => console.log("db is not connected"))

app.use('/books', bookRouter)
app.use('/authors', authorRouter)

const port = 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})