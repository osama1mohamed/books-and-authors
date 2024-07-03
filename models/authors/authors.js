import mongoose from 'mongoose'
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  birthDate: {
    type: Date,
  },
  books: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
    },
    title: String,
  }],
})
const Author = mongoose.model('Author', authorSchema)
export default Author