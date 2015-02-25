var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('rules', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'rules' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving rule: ' + id);
    db.collection('rules', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.findAll = function(req, res) {
    db.collection('rules', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"rules":items});
			console.log(items);
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addrule = function(req, res) {
    var rule = req.body;
    console.log('Adding rule: ' + JSON.stringify(rule));
    db.collection('rules', function(err, collection) {
        collection.insert(rule, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'rule succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////
  


exports.findByAdminEmail = function(req, res) {
    console.log(req.params);
    var email = req.params.adminEmail;
     db.collection('rules', function(err, collection) {
        collection.find({'adminEmail': email}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"rules":item});
				
				//res.send({'Success':'sensor succesfully signed In'});
            }
        });
    });
	
	
};


 
 ///////////////////////////////////////////////////////////////////////////////////////////

exports.updaterule = function(req, res) {
    var id = req.params.id;
    var rule = req.body;
    console.log('Updating rule: ' + id);
    console.log(JSON.stringify(rule));
    db.collection('rules', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, rule, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating rule: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' rule(s) updated');
                //res.send(rule);
				res.send('rule Successfully updated !');
            }
        });
    });
}
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deleterule = function(req, res) {
    var id = req.params.id;
    console.log('Deleting rule: ' + id);
    db.collection('rules', function(err, collection) {
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
 
    var rules = [
    {
        name: "rule 1",
		description: "xxxxxxxxxxxxxx",
		formule: "xxxxxxxxxxxxx",
		adminEmail: "admin@admin.com"
    },
	{
        name: "rule 2",
		description: "xxxxxxxxxxxxxx",
		formule: "xxxxxxxxxxxxx",
		adminEmail: "admin@admin.com"
    },
    {
        name: "rule 3",
		description: "xxxxxxxxxxxxxx",
		formule: "xxxxxxxxxxxxx",
		adminEmail: "admin@admin.com"
    }];
 
    db.collection('rules', function(err, collection) {
        collection.insert(rules, {safe:true}, function(err, result) {});
    });
 
};