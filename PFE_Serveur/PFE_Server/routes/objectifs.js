var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('objectifs', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'objectifs' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUserEmail = function(req, res) {
    console.log(req.params);
    var userEmail = req.params.userEmail;
     db.collection('objectifs', function(err, collection) {
        collection.find({'userEmail': userEmail}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"Objectifs":item});
				
				//res.send({'Success':'objectif succesfully signed In'});
            }
        });
    });
	
	
};




exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving objectif: ' + id);
    db.collection('objectifs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////


 
exports.findAll = function(req, res) {
    db.collection('objectifs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"objectifs":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addObjectif = function(req, res) {
    var objectif = req.body;
	
	if(objectif.name == undefined)
	{
	objectif = 
	{
        name: req.body.objectif.name,
        priority: req.body.objectif.priority,
        comments: req.body.objectif.comments,
        userEmail: req.body.objectif.userEmail,
		admin: req.body.objectif.admin
    }
	}
	
	
	if(objectif._id == "0")
	{
	//delete objectif._id;
		objectif = 
		{
			name: req.body.name,
			priority: req.body.priority,
			comments: req.body.comments,
			userEmail: req.body.userEmail,
			admin: req.body.admin
		}
	}
	
	
    db.collection('objectifs', function(err, collection) {
        collection.insert(objectif, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'objectif succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateObjectif = function(req, res) {
    var id = req.params.id;
    var objectif = req.body;
    
	if(objectif.name == undefined)
	{
	objectif = 
	{
        name: req.body.objectif.name,
        priority: req.body.objectif.priority,
        comments: req.body.objectif.comments,
        userEmail: req.body.objectif.userEmail,
		admin: req.body.objectif.admin
    }
	}
	
	
	
    db.collection('objectifs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, objectif, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating objectif: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' objectif(s) updated');
                //res.send(objectif);
				res.send('objectif Successfully updated !');
            }
        });
    });
}

  exports.findObjectifsAdmin = function(req, res) {
     db.collection('objectifs', function(err, collection) {
        collection.find({'admin': '1'}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"objectifs":item});	
            }
        });
    });
	
	
};



  ///////////////////////////////////////////////////////////////////////////////////////////


exports.deleteObjectif = function(req, res) {
    var id = req.params.id;
    console.log('Deleting objectif: ' + id);
    db.collection('objectifs', function(err, collection) {
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
 
    var objectifs = [
    {
        name: "Reduce my weignt",
        priority: "MEDIUM",
        comments: "I'm on a diet and I need to lose weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "1"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "1"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    },
	{
        name: "Ensure a good body",
        priority: "MEDIUM",
        comments: "I am an athlete and I have to maintain an ideal weight",
        userEmail: "haykel.ouhichi@esprit",
		admin: "0"
    }];
 
    db.collection('objectifs', function(err, collection) {
        collection.insert(objectifs, {safe:true}, function(err, result) {});
    });
 
};