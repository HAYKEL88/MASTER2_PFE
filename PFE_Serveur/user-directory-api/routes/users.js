var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("userdb01");
    db.collection('users', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'users' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});


/*--------------------------------------------------------------------------------------------------------------------*/
 
exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

/*--------------------------------------------------------------------------------------------------------------------*/


exports.findByLogin = function(req, res) {
    console.log(req.params);
    var login = req.params.login;
    console.log('findByLogin: ' + login);
    db.collection('users', function(err, collection) {
        collection.findOne({'login': login}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};


/*--------------------------------------------------------------------------------------------------------------------*/


exports.findByMail = function(req, res) {
    console.log(req.params);
    var mail = req.params.mail;
    console.log('findById: ' + mail);
    db.collection('users', function(err, collection) {
        collection.find({"mail": mail}).toArray(function(err, items) {
                res.jsonp(items);
            });
    });
};



/*--------------------------------------------------------------------------------------------------------------------*/



exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('users', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/


var populateDB = function() {
 
    console.log("Populating user database...");
    var users = [
        {"id": 1, "firstName": "Haykel", "lastName": "OUHICHI", "fullName": "Haykel OUHICHI", "login": "haykel", "mail": "haykel.ouhichi@esprit.tn", "age": "26", "poids": "90", "taille": "188", "categorie": "normal", "pathologie": "Rien"},
        {"id": 2, "firstName": "Dalel", "lastName": "GHARSALLI", "fullName": "Dalel GHARSALLI", "login": "dalel", "mail": "dalel.gharsalli@esprit.tn", "age": "24", "poids": "47", "taille": "164", "categorie": "athletic", "pathologie": "pathologie1"},
        {"id": 3, "firstName": "Amal", "lastName": "ZAYANI", "fullName": "Amal ZAYANI", "login": "amal", "mail": "amal.zayani@esprit.tn", "age": "24", "poids": "61", "taille": "172", "categorie": "inactive", "pathologie": "pathologie2"},
        {"id": 4, "firstName": "Skander", "lastName": "BEN MAHMOUD", "fullName": "Skander BEN MAHMOUD", "login": "skander", "mail": "skander.benmahmoud@esprit.tn", "age": "24", "poids": "84", "taille": "185", "categorie": "risky", "pathologie": "pathologie3"},
        {"id": 5, "firstName": "Mohamed Ali", "lastName": "BEN AYED", "fullName": "Mohamed Ali BEN AYED", "login": "dali", "mail": "mohamedali.benayed@esprit.tn", "age": "24", "poids": "118", "taille": "205", "categorie": "normal", "pathologie": "pathologie4"}
    ];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};