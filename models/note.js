const Schema = require("mongoose").Schema;
const model = require("mongoose").model;

const noteSchema = new Schema({
  userId: String,
  title: String,
  done: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("Note", noteSchema);
