
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaTodo = new Schema(
  {
      user:  { type: Schema.Types.ObjectId, ref: 'users' },
      todo:  {
        type: String,
        required: [true,'column todo must be filled']
      },
      date: {
        type: Date,
        required: [true,'column date must be filled']
      },
      status: {
        type: Boolean,
        default: false,
      },
  },
  {
      timestamps: true
  }
)

const Todos = mongoose.model('todos', schemaTodo)

module.exports = Todos