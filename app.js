var express = require('express')
    , app = express()
    , db = require('./config/dbschema')
    , routes = require('./routes/routes');


app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.favicon());

app.use('/public', express.static('public'));

app.use(app.router);

app.get('/', routes.landing);

//signup pages
app.get('/signup', routes.getsignup);
app.post('/signup', routes.postsignup);

//signup complete
//app.get('/thankyou', routes.thankyou);


//confirm link selected through email
app.get('/confirmedpay/*', routes.confirmedpay);
app.get('/confirmed/*', routes.confirmed);




///////////////////////////////////////////////////////////////////////////////
//API to database
///////////////////////////////////////////////////////////////////////////////

app.get('/super/secret/user/database', function (req, res) {
    db.userModel.find(function (err, doc) {
        res.send(doc);
    })
})

app.get('/super/secret/user/database/choices', function (req, res) {
        res.sendfile('confirmLog.txt');
})


///////////////////////////////////////////////////////////////////////////////
//start app
///////////////////////////////////////////////////////////////////////////////


app.listen(8000, function () {
    console.log('Express server listening on port 8000');
});

