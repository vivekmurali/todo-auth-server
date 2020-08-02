const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const testSchema = new Schema({
    title: String,
    content: String
})


module.exports = model('Test', testSchema);