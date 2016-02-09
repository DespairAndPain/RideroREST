// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var ObjectId = require('mongodb').ObjectId; 

// MongoDB
mongoose.connect('mongodb://localhost/ridero');
grid.mongo = mongoose.mongo;

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/fileupload', function (req, res) {
	var form = new formidable.IncomingForm();
	form.keepExtensions = true;


	form.parse(req, function(err, fields, files) {
		if (!err) {
			console.log('File uploaded : ' + files.file.path);
			
			var conn = mongoose.createConnection('mongodb://localhost/ridero');
			conn.once('open', function () {
				var gfs = grid(conn.db);
				var writestream = gfs.createWriteStream({
					filename: files.file.name,
					aliases: 'sadsdasdasdsadsad'
				});
				res.redirect('/?id='+writestream._store.fileId);
				console.log(writestream._store.fileId);
				//res.json({userId : writestream._store.fileId});
				fs.createReadStream(files.file.path).pipe(writestream);

			});
		}        
	});

	form.on('end', function() {        
		//res.send('Completed');
	});
	
});


app.get('/get/:id', function (req, res) {
	var conn = mongoose.createConnection('mongodb://localhost/ridero');
	var id = req.params.id+"";
	console.log(id);
	//56b8e5363a8a20d63ddcf5ec
	conn.once('open', function () {
		var gfs = grid(conn.db);
		gfs.createReadStream({_id: ObjectId(id)}).pipe(res);
	});
});

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(3000);
console.log('API is running on port 3000');