var express = require('express'),
    wines = require('./routes/users');
 
var app = express();

app.get('/users/:id', wines.findById);
app.get('/users/login/:login', wines.findByLogin);
app.get('/users/mail/:mail', wines.findByMail);
app.get('/users', wines.findAll);

app.listen(3000);
console.log('Listening on port 3000...');