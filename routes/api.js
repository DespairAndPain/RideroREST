// Зависимости
var express = require('express');
var router = express.Router();

// модель
var Books = require('../models/books');

// API для редактирования
Books.methods(['get', 'put', 'post', 'delete']);
Books.register(router, '/books');

// возвращаем роутинг
module.exports = router;

