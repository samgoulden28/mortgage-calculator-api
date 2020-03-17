var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the port
var port = process.env.PORT || 8080;        // set our port

//Use express router to add endpoints to the api
var router = express.Router();

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// all of our routes will be prefixed with /api
app.use('/api', router);

// Turn on that server!
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});