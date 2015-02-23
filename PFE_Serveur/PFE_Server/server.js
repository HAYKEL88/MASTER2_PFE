var express = require('express'),
    user = require('./routes/users'),
	rule = require('./routes/rules'),
	objectif = require('./routes/objectifs'),
	admin = require('./routes/admins'),
	sensor = require('./routes/sensors'),
	reclamation = require('./routes/reclamations'),
	service = require('./routes/services');
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
	app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
   // res.setHeader('Access-Control-Allow-Credentials', true);
   
   next();
});
});
 
//Users
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.adduser);
app.get('/users/email/:email', user.findByEmail);
app.post('/users/signIn', user.signIn);
app.put('/users/:id', user.updateuser);
app.post('/users/:id', user.updateuser);
app.delete('/users/:id', user.deleteuser);


//Admins
app.get('/admins', admin.findAll);
app.get('/admins/:id', admin.findById);
app.post('/admins', admin.addadmin);
app.get('/admins/email/:email', admin.findByEmail);
app.post('/admins/signIn', admin.signIn);
app.put('/admins/:id', admin.updateadmin);
app.post('/admins/:id', admin.updateadmin);
app.delete('/admins/:id', admin.deleteadmin);



//Objectifs
app.get('/objectifs', objectif.findAll);
app.get('/objectifs/:id', objectif.findById);
app.get('/objectifs/email/:userEmail', objectif.findByUserEmail);
app.post('/objectifs', objectif.addObjectif);
app.get('/objectifs', objectif.findObjectifsAdmin);
app.put('/objectifs/:id', objectif.updateObjectif);
app.post('/objectifs/:id', objectif.updateObjectif);
app.delete('/objectifs/:id', objectif.deleteObjectif);

//Services
app.get('/services', service.findAll);
app.get('/services/:id', service.findById)
app.post('/services', service.addservice);
app.put('/services/:id', service.updateservice);
app.post('/services/:id', service.updateservice);
app.delete('/services/:id', service.deleteservice);

//rules
app.get('/rules', rule.findAll);
app.get('/rules/:id', rule.findById)
app.post('/rules', rule.addrule);
app.put('/rules/:id', rule.updaterule);
app.post('/rules/:id', rule.updaterule);
app.delete('/rules/:id', rule.deleterule);


//Sensors
app.get('/sensors', sensor.findAll);
app.get('/sensors/:id', sensor.findById)
app.get('/sensors/email/:email', sensor.findByUser);
app.get('/sensors/email/:email/name/:name', sensor.findByUserAndName);
app.post('/sensors', sensor.addsensor);
app.put('/sensors/:id', sensor.updatesensor);
app.delete('/sensors/:id', sensor.deletesensor);




//Reclamations
app.get('/reclamations', reclamation.findAll);
app.get('/reclamations/:id', reclamation.findById)
app.get('/reclamations/email/:email', reclamation.findByUser);
app.post('/reclamations', reclamation.addreclamation);
app.put('/reclamations/:id', reclamation.updatereclamation);
app.post('/reclamations/:id', reclamation.updatereclamation);
app.delete('/reclamations/:id', reclamation.deletereclamation);




 
app.listen(3000);
console.log('Listening on port 3000...');