
Server Part :
=============



Step 1: Install dependencies (Express Framework and MongoDB driver) :
=====================================================================

Open package.json in a code editor and note that the application has two dependencies: the Express framework and the MongoDB driver. To install these dependencies, open a command line (terminal window), cd to the directory where you extracted the source code, and type:

npm install


Step 2: Start the server :
==========================

Make sure MongoDB is started before you start your Node.js server as follows:

node server.js

Step 3: Testing the API in your Browser :
=========================================

* Retrieve all users

http://localhost:3000/users

* Retrieve all users whose name includes the letter "h" 

http://localhost:3000/users?name=h

* Retrieve user with id == 1 

http://localhost:3000/users/1

* Retrieve user with login == "haykel"

http://localhost:3000/users/login/haykel

* Retrieve user with mail == "haykel.ouhichi@esprit.tn"

http://localhost:3000/users/mail/haykel.ouhichi@esprit.tn




