var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('alertes', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'alertes' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUserEmail = function(req, res) {
    console.log(req.params);
    var userEmail = req.params.userEmail;
     db.collection('alertes', function(err, collection) {
        collection.find({'userEmail': userEmail}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"Alertes":item});
				
				//res.send({'Success':'alerte succesfully signed In'});
            }
        });
    });
	
	
};




exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving alerte: ' + id);
    db.collection('alertes', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////


 
exports.findAll = function(req, res) {
    db.collection('alertes', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"alertes":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addAlerte = function(req, res) {
    var alerte = req.body;
	
	if(alerte.name == undefined)
	{
	alerte = 
	{
        name: req.body.alerte.name,
        priority: req.body.alerte.priority,
        comments: req.body.alerte.comments,
        userEmail: req.body.alerte.userEmail,
		admin: req.body.alerte.admin
    }
	}
	
	
	if(alerte._id == "0")
	{
	//delete alerte._id;
		alerte = 
		{
			name: req.body.name,
			priority: req.body.priority,
			comments: req.body.comments,
			userEmail: req.body.userEmail,
			admin: req.body.admin
		}
	}
	
	
    db.collection('alertes', function(err, collection) {
        collection.insert(alerte, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'alerte succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateAlerte = function(req, res) {
    var id = req.params.id;
    var alerte = req.body;
    
	if(alerte.name == undefined)
	{
	alerte = 
	{
        name: req.body.alerte.name,
        priority: req.body.alerte.priority,
        comments: req.body.alerte.comments,
        userEmail: req.body.alerte.userEmail,
		admin: req.body.alerte.admin
    }
	}
	
	
	
    db.collection('alertes', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, alerte, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating alerte: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' alerte(s) updated');
                //res.send(alerte);
				res.send('alerte Successfully updated !');
            }
        });
    });
}





  ///////////////////////////////////////////////////////////////////////////////////////////


exports.deleteAlerte = function(req, res) {
    var id = req.params.id;
    console.log('Deleting alerte: ' + id);
    db.collection('alertes', function(err, collection) {
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
 
    var alertes = [
    {
        description: "First Alerte",
        priority: "MEDIUM",
		date: "01/02/2015",
        time: "02:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "HIGH",
		date: "02/02/2015",
        time: "12:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "LOW",
		date: "03/02/2015",
        time: "02:37:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "04/02/2015",
        time: "19:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "05/02/2015",
        time: "02:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "06/02/2015",
        time: "06:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "07/02/2015",
        time: "08:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "08/02/2015",
        time: "13:17:19",
        userEmail: "pfe@pfe.pfe"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "09/02/2015",
        time: "15:17:19",
        userEmail: "pfe@pfe.pfe"
    }];
 
    db.collection('alertes', function(err, collection) {
        collection.insert(alertes, {safe:true}, function(err, result) {});
    });
 
};