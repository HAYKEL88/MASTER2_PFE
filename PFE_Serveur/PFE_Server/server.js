var express = require('express'),
    user = require('./routes/users'),
	rule = require('./routes/rules'),
	service = require('./routes/services');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});
 
//Users
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.adduser);
app.post('/users/signIn', user.signIn);
app.post('/users/addObjectif/:id', user.addObjectif);
app.put('/users/:id', user.updateuser);
app.delete('/users/:id', user.deleteuser);

//Services
app.get('/services', service.findAll);
app.get('/services/:id', service.findById)
app.post('/services', service.addservice);
app.put('/services/:id', service.updateservice);
app.delete('/services/:id', service.deleteservice);

//rules
app.get('/rules', rule.findAll);
app.get('/rules/:id', rule.findById)
app.post('/rules', rule.addrule);
app.put('/rules/:id', rule.updaterule);
app.delete('/rules/:id', rule.deleterule);
 
app.listen(3000);
console.log('Listening on port 3000...');