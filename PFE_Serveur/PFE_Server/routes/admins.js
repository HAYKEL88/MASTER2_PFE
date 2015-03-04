var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('admins', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'admins' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByEmail = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
     db.collection('admins', function(err, collection) {
        collection.find({'email': email}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"admins":item});
				
				//res.send({'Success':'admin succesfully signed In'});
            }
        });
    });
	
	
};



/*
exports.findByEmail = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
    console.log('findByLogin: ' + email);
    db.collection('admins', function(err, collection) {
        collection.find({'email': email}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

*/
/*--------------------------------------------------------------------------------------------------------------------*/

 
 ///////////////////////////////////////////////////////////////////////////////////////////
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving admin: ' + id);
    db.collection('admins', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------------------------------------------------------------------------------------*/

exports.signIn = function(req, res) {
    var admin = req.body;
    console.log('Sign In admin: ' + JSON.stringify(admin));
     db.collection('admins', function(err, collection) {
        collection.find(admin).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"admins":item});
				
				//res.send({'Success':'admin succesfully signed In'});
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

 
exports.findAll = function(req, res) {
    db.collection('admins', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"admins":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addadmin = function(req, res) {
       var admin = req.body;
	
	if(admin.email == undefined)
	{
	admin = 
	{
        firstName: req.body.admin.firstName,
        lastName: req.body.admin.lastName,
        email: req.body.admin.email,
        password: req.body.admin.password
    }
	}
	if(admin._id == "0")
	{
	//delete admin._id;
		admin = 
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password
		}
	}
	

	
	var result;
	// Verify if admin Email exist
	db.collection('admins', function(err, collection) {
        collection.find({'email': admin.email}).toArray( function(err, item) {
            if (err) {
                
            } else {
				result =item;
            }
        });
    });
	
	
	if(result == undefined)
	{
	db.collection('admins', function(err, collection) {
        collection.insert(admin, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'Admin succesfully added'});
            }
        });
    });
	
	
	}
	else
	{
    res.send({'Error':'Admin Email exist, Please shoose another'});
	
	}
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateadmin = function(req, res) {
    var id = req.params.id;
    var admin = req.body;
    
	if(admin.email == undefined)
	{
	admin = 
	{
        firstName: req.body.admin.firstName,
        lastName: req.body.admin.lastName,
        email: req.body.admin.email,
        password: req.body.admin.password
    }
	}
	
    db.collection('admins', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, admin, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating admin: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' admin(s) updated');
                //res.send(admin);
				res.send('admin Successfully updated !');
            }
        });
    });
	

}
  ///////////////////////////////////////////////////////////////////////////////////////////

  /*

exports.addObjectif = function(req, res) {
    var id = req.params.id;
    var admin = req.body;
    console.log('Updating admin: ' + id);
    console.log(JSON.stringify(admin));
    db.collection('admins', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, admin, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error adding Objectif: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' admin(s) updated');
                //res.send(admin);
				res.send('Objectif Successfully updated !');
            }
        });
    });
}

*/
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deleteadmin = function(req, res) {
    var id = req.params.id;
    console.log('Deleting admin: ' + id);
    db.collection('admins', function(err, collection) {
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
 
    var admins = [
	{
        firstName: "admin",
        lastName: "admin",
        email: "admin@admin.com",
        password: "admin"
    }];
 
    db.collection('admins', function(err, collection) {
        collection.insert(admins, {safe:true}, function(err, result) {});
    });
 
};