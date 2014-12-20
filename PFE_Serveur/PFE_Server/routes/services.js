var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('Services', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'Services' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving service: ' + id);
    db.collection('Services', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

 
 
exports.findAll = function(req, res) {
    db.collection('Services', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"Services":items});
			console.log(items);
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addservice = function(req, res) {
    var service = req.body;
    console.log('Adding service: ' + JSON.stringify(service));
    db.collection('Services', function(err, collection) {
        collection.insert(service, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'service succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateservice = function(req, res) {
    var id = req.params.id;
    var service = req.body;
    console.log('Updating service: ' + id);
    console.log(JSON.stringify(service));
    db.collection('Services', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, service, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating service: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' service(s) updated');
                res.send(service);
            }
        });
    });
}
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deleteservice = function(req, res) {
    var id = req.params.id;
    console.log('Deleting service: ' + id);
    db.collection('Services', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' service(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
 
    var Services = [
    {
        name: "Service 1",
        description: "Description service 1",
        link: "www.haikelouhichi.magix.net/public"
    },
    {
        name: "Service 2",
        description: "Description service 2",
        link: "www.haikelouhichi.magix.net/public"
    }];
 
    db.collection('Services', function(err, collection) {
        collection.insert(Services, {safe:true}, function(err, result) {});
    });
 
};