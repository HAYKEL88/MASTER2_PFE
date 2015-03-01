var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('PFEDB', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'PFEDB' database");
        db.collection('recommendations', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'recommendations' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
 
 
 /*--------------------------------------------------------------------------------------------------------------------*/


exports.findByUserEmail = function(req, res) {
    console.log(req.params);
    var userEmail = req.params.userEmail;
     db.collection('recommendations', function(err, collection) {
        collection.find({'userEmail': userEmail}).toArray( function(err, item) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(item));
                res.jsonp({"Recommendations":item});
				
				//res.send({'Success':'recommendation succesfully signed In'});
            }
        });
    });
	
	
};




exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving recommendation: ' + id);
    db.collection('recommendations', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.jsonp(item);
        });
    });
};


 ///////////////////////////////////////////////////////////////////////////////////////////


 
exports.findAll = function(req, res) {
    db.collection('recommendations', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.jsonp({"recommendations":items});
			console.log('Success: ' + JSON.stringify(items));
        });
    });
};

 ///////////////////////////////////////////////////////////////////////////////////////////

 
exports.addRecommendation = function(req, res) {
    var recommendation = req.body;
	
	if(recommendation.name == undefined)
	{
	recommendation = 
	{
        name: req.body.recommendation.name,
        priority: req.body.recommendation.priority,
        comments: req.body.recommendation.comments,
        userEmail: req.body.recommendation.userEmail,
		admin: req.body.recommendation.admin
    }
	}
	
	
	if(recommendation._id == "0")
	{
	//delete recommendation._id;
		recommendation = 
		{
			name: req.body.name,
			priority: req.body.priority,
			comments: req.body.comments,
			userEmail: req.body.userEmail,
			admin: req.body.admin
		}
	}
	
	
    db.collection('recommendations', function(err, collection) {
        collection.insert(recommendation, {safe:true}, function(err, result) {
            if (err) {
                //res.send({'error':'An error has occurred'});
				res.send({'Error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                //res.send(result[0]);
				res.send({'Success':'recommendation succesfully added'});
            }
        });
    });
}
 
  ///////////////////////////////////////////////////////////////////////////////////////////

exports.updateRecommendation = function(req, res) {
    var id = req.params.id;
    var recommendation = req.body;
    
	if(recommendation.name == undefined)
	{
	recommendation = 
	{
        name: req.body.recommendation.name,
        priority: req.body.recommendation.priority,
        comments: req.body.recommendation.comments,
        userEmail: req.body.recommendation.userEmail,
		admin: req.body.recommendation.admin
    }
	}
	
	
	
    db.collection('recommendations', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, recommendation, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating recommendation: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' recommendation(s) updated');
                //res.send(recommendation);
				res.send('recommendation Successfully updated !');
            }
        });
    });
}





  ///////////////////////////////////////////////////////////////////////////////////////////


exports.deleteRecommendation = function(req, res) {
    var id = req.params.id;
    console.log('Deleting recommendation: ' + id);
    db.collection('recommendations', function(err, collection) {
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
 
    var recommendations = [
    {
        description: "First Recommendation",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "HIGH",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "LOW",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    },
	{
        description: "Ensure a good body",
        priority: "MEDIUM",
		date: "23/02/2015",
        time: "02:17:19",
        userEmail: "haykel.ouhichi@esprit"
    }];
 
    db.collection('recommendations', function(err, collection) {
        collection.insert(recommendations, {safe:true}, function(err, result) {});
    });
 
};