var express = require('express');
var app = express();
var path = require('path')
const fs = require('fs');

// const csv=require('csvtojson')

// const csvFilePath='./data.csv'

const sqlite3 = require('sqlite3')

let db = new sqlite3.Database("./mydb.sqlite3", (err) => { 
    if (err) { 
        console.log('Error when connnecting to the database', err) 
    } else { 
        console.log('Database connected!') 
		/* Put code to create table(s) here */
		
    } 
})

// db.all("SELECT * FROM main", (err, rows) => {
// 	if (err) {
// 		console.log("Error quering data", err)
// 	} else {
// 		console.log(rows)
// 	}
// })

// const createTable = () => {
//     console.log("create database table contacts");
//     db.run("INSERT INTO main (name, status) VALUES('Angus', 1)");
// }

var data = null;
function getName(item) {
	return item.Name;
}

function getStatus(item) {
	return item.Status;
}

app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname + '/html/Untitled-1.html'))
});

app.get('/style.css', function(req,res) {
	res.sendFile(path.join(__dirname + '/html/style.css'))
});



app.get('/app/status-app/api/init', function(req, res) {
	if (data == null) {
		db.all("SELECT * FROM main", (err, rows) => {
			if (err) {
				console.log("Error quering data", err)
			} else {
				// console.log(rows)
				data = rows
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(data));	
				updated = false;
			}
		})
	} else {
		// console.log(data)
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(data));	
	}
})

app.get('/app/status-app/api/update', (req, res) => {
	queryName = req.query.name;
	queryStatus = req.query.status;
	if (queryName == "Qiusen") {
		data[0].status = Number(queryStatus)
	} else {
		data[1].status = Number(queryStatus)
	}
	db.run("UPDATE main SET status = $status WHERE name = $name", {
		$name: queryName,
		$status: queryStatus
	});
	res.send("OK")
})

// app.listen(5000);
app.listen(5000, '172.26.9.56');

