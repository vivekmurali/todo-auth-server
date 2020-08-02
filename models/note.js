const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const noteSchema = new Schema({
    userId: String,
    title: String,
    content: String,
    date: {
        type: Date,
        default: new Date()
    }
})


module.exports = model('Note', noteSchema);