
// Зависимости
var restful = require('node-restful');
var mongoose = restful.mongoose;
var mongooose = require('mongoose');

// Схема
var bookSchema = new mongoose.Schema({
    author: String,
    title: String,
    file: String
});

// возвращаем модель
module.exports = restful.model('Books', bookSchema);
