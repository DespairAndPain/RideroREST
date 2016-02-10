// Зависимости
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var grid = require('gridfs-stream');
var fs = require('fs');
var util = require('util');
var db = require('mongodb')
var ObjectId = require('mongodb').ObjectId; 

// Подключение к базе
mongoose.connect('mongodb://localhost/ridero');
grid.mongo = mongoose.mongo;

// Запуск экспресса и бодипарсера
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Подключение статических файлов
app.use(express.static(__dirname + '/public'));

// Обработка пост запоса на добавление файла
app.post('/fileupload', function (req, res) {

	// использование формы из formidable
	var form = new formidable.IncomingForm();
	form.keepExtensions = true;


	form.parse(req, function(err, fields, files) {
		if (!err) {

			console.log('File uploaded : ' + files.file.path);
			
			
			var conn = mongoose.createConnection('mongodb://localhost/ridero');
			conn.once('open', function () {
				var gfs = grid(conn.db);

				// Создание стрима на запись с параметром названия файла
				var writestream = gfs.createWriteStream({
					filename: files.file.name,
				});

				// Редирект на глвную с параметром ObjectId из монги
				res.redirect('/?id='+writestream._store.fileId);
				console.log(writestream._store.fileId);

				//запуск отправки
				fs.createReadStream(files.file.path).pipe(writestream);

			});
		}        
	});

	form.on('end', function() {        
		//res.send('Найс');
	});
	
});


// Удаление файла при запросе на удаление книги
app.delete('/delete/book/:id', function(req, res) {
	var id = req.params.id+"";
	var conn = mongoose.createConnection('mongodb://localhost/ridero');
	console.log('hey');

//	var Books = r;

//	Books.findOne({ _id : ObjectId(id) }, function (err, obj) {
//	    if (err) return cb(err); // don't forget to handle error/
//	    var gfs = grid(conn.db);
//	    gfs.remove(obj, function(err){
//	      if (err) return false;
//	      console.log('success');
//	      return true;          
//	    })
//	});

//
	conn.once('open', function () {
		var gfs = grid(conn.db);

		//грид ремув 
		//https://www.npmjs.com/package/gridfs-stream
		var rem = gfs.remove({_id: ObjectId(id)}, function (err) {

		  if (err) return console.log(err);
		  console.log('success');

		});

		console.log(rem);
	});

});


// Просмотр .txt файла
app.get('/get/:id', function (req, res) {
	var conn = mongoose.createConnection('mongodb://localhost/ridero');
	var id = req.params.id+"";
	console.log(id);

	try {
		conn.once('open', function () {

			var gfs = grid(conn.db);
			// Создание потока по айдишнику
			var gfs = gfs.createReadStream({_id: ObjectId(id)}).pipe(res);
		});
	} catch (err) {

		console.log(err);	
	}
	
});

// API для добавление коллекции с автором и название книги и путем к файлу
app.use('/api', require('./routes/api'));

app.listen(3000);
console.log('Somthing running on port 3000');

//Готов работать за еду