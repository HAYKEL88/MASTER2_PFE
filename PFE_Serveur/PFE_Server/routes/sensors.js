var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('sensors', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'sensors' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUser = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
     db.collection('sensors', function(err, collection) {
        collection.find({'userEmail': email}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"sensors":item});
				
				//res.send({'Success':'sensor succesfully signed In'});
            }
        });
    });
	
	
};


 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
 
  /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUserAndName = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
	var name = req.params.name;
	
	console.log(email);
	console.log(name);
	
     db.collection('sensors', function(err, collection) {
        collection.find({'userEmail': email,'name': name}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"sensors":item});
				
				//res.send({'Success':'sensor succesfully signed In'});
            }
        });
    });
	
	
};


 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving sensor: ' + id);
    db.collection('sensors', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.findAll = function(req, res) {
    db.collection('sensors', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"sensors":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addsensor = function(req, res) {
    var sensor = req.body;
	console.log(sensor);
    console.log('Adding sensor: ' + JSON.stringify(sensor));
    db.collection('sensors', function(err, collection) {
        collection.insert(sensor, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'sensor succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updatesensor = function(req, res) {
    var id = req.params.id;
    var sensor = req.body;
    console.log('Updating sensor: ' + id);
    console.log(JSON.stringify(sensor));
    db.collection('sensors', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, sensor, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating sensor: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' sensor(s) updated');
                //res.send(sensor);
				res.send('sensor Successfully updated !');
            }
        });
    });
}
  ///////////////////////////////////////////////////////////////////////////////////////////

 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deletesensor = function(req, res) {
    var id = req.params.id;
    console.log('Deleting sensor: ' + id);
    db.collection('sensors', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var sensors = [
    {
        name: "Heart Rate",
        value: "77.0",
        accuracy: "2",
        timestamp: "1424654082125547860",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit.tn",
    },
	{
        name: "Heart Rate",
        value: "78.0",
        accuracy: "2",
        timestamp: "1424654082125547860",
		date: "23/02/2015",
        time: "02:18:39",
        userEmail: "haykel.ouhichi@esprit.tn",
    }];
 
    db.collection('sensors', function(err, collection) {
        collection.insert(sensors, {safe:true}, function(err, result) {});
    });
 
};