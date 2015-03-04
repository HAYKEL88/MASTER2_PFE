var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('reclamations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'reclamations' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUser = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
     db.collection('reclamations', function(err, collection) {
        collection.find({'userEmail': email}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"reclamations":item});
				
				//res.send({'Success':'reclamation succesfully signed In'});
            }
        });
    });
	
	
};


 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
 
  


 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
 
 

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving reclamation: ' + id);
    db.collection('reclamations', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.findAll = function(req, res) {
    db.collection('reclamations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"reclamations":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addreclamation = function(req, res) {
    var reclamation = req.body;
	
	if(reclamation.userEmail == undefined)
	{
	reclamation = 
	{
        description: req.body.reclamation.description,
        userEmail: req.body.reclamation.userEmail
    }
	}
	
	if(reclamation._id == "0")
	{
	//delete reclamation._id;
		reclamation = 
		{
			description: req.body.description,
			userEmail: req.body.userEmail
		}
	}
	
	
    db.collection('reclamations', function(err, collection) {
        collection.insert(reclamation, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'reclamation succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updatereclamation = function(req, res) {
    var id = req.params.id;
    var reclamation = req.body;
    
	
	if(reclamation.userEmail == undefined)
	{
	reclamation = 
	{
        description: req.body.reclamation.description,
        userEmail: req.body.reclamation.userEmail
    }
	}
	
	
    db.collection('reclamations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, reclamation, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating reclamation: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' reclamation(s) updated');
                //res.send(reclamation);
				res.send('reclamation Successfully updated !');
            }
        });
    });
}
  ///////////////////////////////////////////////////////////////////////////////////////////

 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deletereclamation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting reclamation: ' + id);
    db.collection('reclamations', function(err, collection) {
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
 
    var reclamations = [
    {
        description: "Hello First Reclamation",
		userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Hello Second Reclamation",
		userEmail: "pfe@pfe.pfe"
    }];
 
    db.collection('reclamations', function(err, collection) {
        collection.insert(reclamations, {safe:true}, function(err, result) {});
    });
 
};