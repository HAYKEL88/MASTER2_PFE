var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByEmail = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
     db.collection('users', function(err, collection) {
        collection.find({'email': email}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"users":item});
				
				//res.send({'Success':'User succesfully signed In'});
            }
        });
    });
	
	
};



/*
exports.findByEmail = function(req, res) {
    console.log(req.params);
    var email = req.params.email;
    console.log('findByLogin: ' + email);
    db.collection('users', function(err, collection) {
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
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////

/*--------------------------------------------------------------------------------------------------------------------*/

exports.signIn = function(req, res) {
    var user = req.body;
    console.log('Sign In user: ' + JSON.stringify(user));
	
	var item1;
	
	
	
	
     db.collection('users', function(err, collection) {
        collection.find(user).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                //console.log('Success: ' + JSON.stringify(item));
                //res.jsonp({"users":item});
				item1 =item;
				//res.send({'Success':'User succesfully signed In'});
            }
        });
    });
	
	
	
	
	db.collection('admins', function(err, collection) {
        collection.find(user).toArray( function(err2, item2) {
            if (err2) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
				console.log('Success: ' + JSON.stringify(item2));
				console.log('***************************************************');
				console.log('Success: ' + JSON.stringify(item1));
                res.jsonp({"admins":item2,"users":item1});
				
				//res.send({'Success':'User succesfully signed In'});
            }
        });
    });
	
	
}

/*--------------------------------------------------------------------------------------------------------------------*/

 
exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"users":items});
			//console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.adduser = function(req, res) {
    var user = req.body;
	
	if(user.email == undefined)
	{
	user = 
	{
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        age: req.body.user.age,
        sex: req.body.user.sex,
		height: req.body.user.height,
        weight: req.body.user.weight,
        email: req.body.user.email,
        password: req.body.user.password
    }
	}
	console.log(user.firstName);
	if(user._id == "0")
	{
	//delete user._id;
		user = 
		{
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			age: req.body.age,
			sex: req.body.sex,
			height: req.body.height,
			weight: req.body.weight,
			email: req.body.email,
			password: req.body.password
		}
	}
	
	console.log(user);
	
	var result;
	// Verify if user Email exist
	db.collection('users', function(err, collection) {
        collection.find({'email': user.email}).toArray( function(err, item) {
            if (err) {
                
            } else {
				result =item;
            }
        });
    });
	
	
	if(result == undefined)
	{
	db.collection('users', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'User succesfully added'});
            }
        });
    });
	
	
	}
	else
	{
    res.send({'Error':'User Email exist, Please shoose another'});
	
	}
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateuser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
     
	console.log(user.email);
	
	if(user.email == undefined)
	{
	user = 
	{
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        age: req.body.user.age,
        sex: req.body.user.sex,
		height: req.body.user.height,
        weight: req.body.user.weight,
        email: req.body.user.email,
        password: req.body.user.password
    }
	
	
	}	
	
    db.collection('users', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' User(s) updated');
				res.send('User Successfully updated !');
            }
        });
    });
	
}

  ///////////////////////////////////////////////////////////////////////////////////////////

exports.deleteuser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('users', function(err, collection) {
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
 
    var users = [
    {
        firstName: "pfe",
        lastName: "PFE",
        age: "26",
        sex: "Man",
		height: "189",
        weight: "94",
        email: "pfe@pfe.pfe",
        password: "pfe"
    },
	{
        firstName: "Haykel",
        lastName: "OUHICHI",
        age: "26",
        sex: "Man",
		height: "189",
        weight: "94",
        email: "haykel.ouhichi@esprit.tn",
        password: "haykel"
    },
	{
        firstName: "Dalel",
        lastName: "GHARSALLI",
        age: "24",
        sex: "Woman",
		height: "164",
        weight: "46",
        email: "dalel.gharsalli@esprit.tn",
        password: "dalel"
    },
	{
        firstName: "Mohamed Ali",
        lastName: "Ben Ayed",
        age: "24",
        sex: "Man",
		height: "201",
        weight: "118",
        email: "mohamedali.benayed@esprit.tn",
        password: "dali"
    },
	{
        firstName: "Amal",
        lastName: "ZAYANI",
        age: "25",
        sex: "Woman",
		height: "172",
        weight: "69",
        email: "amal.zayani@esprit.tn",
        password: "amal"
    },
	{
        firstName: "Skander",
        lastName: "BEN MAHMOUD",
        age: "26",
        sex: "Man",
		height: "177",
        weight: "88",
        email: "skander.benmahmoud@esprit.tn",
        password: "skander"
    },
	{
        firstName: "Amel",
        lastName: "BEN OTHMENE",
        age: "27",
        sex: "Woman",
		height: "177",
        weight: "77",
        email: "benothmane.amel@gmail.com",
        password: "amel"
    },
	{
        firstName: "Michel",
        lastName: "BUFFA",
        age: "44",
        sex: "Man",
		height: "180",
        weight: "75",
        email: "michelbuffa@gmail.com",
        password: "michel"
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};