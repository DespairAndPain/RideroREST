
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    file: String
});

// Return model
module.exports = restful.model('Books', bookSchema);
