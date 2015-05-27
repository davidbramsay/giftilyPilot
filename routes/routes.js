var db = require('../config/dbschema');
var fs = require("fs");

//landing page, redirects to login, fitbit authorization, avatar creation, or main screen
//depending on whether user is authenticated and what information is found in the database
exports.landing = function(req, res) {

  res.sendfile('./views/index.html');

};


exports.confirmed = function(req, res) {
  fs.appendFile('./confirmLog.txt', req.originalUrl.slice(11) + "\n", function (err) {console.log("ERROR: " + req.originalUrl);});
  res.render("confirmed");
}

exports.confirmedpay = function(req, res) {
  fs.appendFile('./confirmLog.txt', req.originalUrl.slice(14) + " (payment) \n", function (err) {console.log("ERROR: " + req.originalUrl);});
  res.render("confirmedpay");
}

//signup page 
exports.getsignup = function(req, res) {
    res.sendfile('./views/signup.html');
};


//signup page post
exports.postsignup = function (req, res) {
    
    var body = req.body;
    
    address = [ body.street, body.street2, body.city + ", " + body.state + " " + body.zipcode ];
    faddress = [ body.fstreet, body.fstreet2, body.fcity + ", " + body.fstate + " " + body.fzipcode ];

    
    //body.firstName, lastName, email, gender, cardPreference, whoFrom
    
    if (!body.phone){
      body.phone = "";
    }

    console.log(body);

    var user = new db.userModel({ 
        firstName: body.firstName
      , lastName:body.lastName
      , email: body.email
      , phone: body.phone
      , gender: body.gender
      , address: address
      , fathersAddress: faddress
      , cardPreference: body.cardPreference
      , whoFrom: body.whoFrom
    });
  
    user.save(function(err) {
      if(err) {
        res.render("error");
      } else {
        res.render("thankyou", {address: address, faddress: faddress, firstName: body.firstName, lastName: body.lastName, email: body.email});
      }
    });


}


  

