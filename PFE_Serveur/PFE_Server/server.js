var express = require('express'),
    user = require('./routes/users'),
	rule = require('./routes/rules'),
	objectif = require('./routes/objectifs'),
	admin = require('./routes/admins'),
	sensor = require('./routes/sensors'),
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
app.get('/users/email/:email', user.findByEmail);
app.post('/users/signIn', user.signIn);
app.put('/users/:id', user.updateuser);
app.delete('/users/:id', user.deleteuser);


//Admins
app.get('/admins', admin.findAll);
app.get('/admins/:id', admin.findById);
app.post('/admins', admin.addadmin);
app.get('/admins/email/:email', admin.findByEmail);
app.post('/admins/signIn', admin.signIn);
app.put('/admins/:id', admin.updateadmin);
app.delete('/admins/:id', admin.deleteadmin);



//Objectifs
app.get('/objectifs', objectif.findAll);
app.get('/objectifs/:id', objectif.findById);
app.post('/objectifs', objectif.addObjectif);
app.get('/objectifs', objectif.findObjectifsAdmin);
app.put('/objectifs/:id', objectif.updateObjectif);
app.delete('/objectifs/:id', objectif.deleteObjectif);

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


//Sensors
app.get('/sensors', sensor.findAll);
app.get('/sensors/:id', sensor.findById)
app.get('/sensors/email/:email', sensor.findByUser);
app.get('/sensors/email/:email/name/:name', sensor.findByUserAndName);
app.post('/sensors', sensor.addsensor);
app.put('/sensors/:id', sensor.updatesensor);
app.delete('/sensors/:id', sensor.deletesensor);




 
app.listen(3000);
console.log('Listening on port 3000...');