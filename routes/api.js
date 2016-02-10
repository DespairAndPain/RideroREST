// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Books = require('../models/books');

// Routes
Books.methods(['get', 'put', 'post', 'delete']);
Books.register(router, '/books');

// Return router
module.exports = router;

