var express = require('express'),
    user = require('./routes/users'),
	service = require('./routes/services');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.adduser);
app.post('/users/signIn', user.signIn);
app.put('/users/:id', user.updateuser);
app.delete('/users/:id', user.deleteuser);

app.get('/services', service.findAll);
app.get('/services/:id', service.findById)
app.post('/services', service.addservice);
app.put('/services/:id', service.updateservice);
app.delete('/services/:id', service.deleteservice);
 
app.listen(3000);
console.log('Listening on port 3000...');