var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
const mortgage = require ('./mortgage')

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

// Get payment amount
router.get('/payment-amount', function(req, res) {
    // Validate query params
    if (!req.query.askingPrice || 
        !req.query.downPayment || 
        !req.query.paymentSchedule || 
        !req.query.amortizationPeriod) {
        res.status(500).json({
            statusCode: 500,
            errorMessage: `Include askingPrice, downPayment, paymentSchedule and amortizationPeriod in queryParams.`,
            receivedParams: Object.keys(req.query)
        })
    }

    // Get the payment amount from mortgage class
    let paymentAmountResponse = mortgage.getPaymentAmount(
        req.query.askingPrice,
        req.query.downPayment, 
        req.query.paymentSchedule,
        req.query.amortizationPeriod) 

    // Return an error if one was found
    if(paymentAmountResponse.status !== 200 || !paymentAmountResponse.paymentAmount) {
        res.status(paymentAmountResponse.status).json({
            statusCode: paymentAmountResponse.status,
            errorMessage: paymentAmountResponse.returnReason
        })
    }
    res.json({ paymentAmount: paymentAmountResponse.paymentAmount, timesPaid: paymentAmountResponse.timesPaid, totalPaid: paymentAmountResponse.totalPaid})
})

/* 
GET /mortgage-amount
Get the maximum mortgage amount (principal)
Params: (query string)
payment amount
Payment schedule***
Amortization Period**
Return:
Maximum Mortgage that can be taken out in JSON form
*/

router.get('/mortgage-amount', function(req, res) {
    if (!req.query.paymentAmount || 
        !req.query.paymentSchedule || 
        !req.query.amortizationPeriod) {
        res.status(500).json({
            Error: `Include paymentAmount, paymentSchedule and amortizationPeriod in query parameters.`,
            receivedParams: Object.keys(req.query)
        })
    }
    let mortgageAmountResponse = mortgage.getMortgageAmount(req.query.paymentAmount, req.query.paymentSchedule, req.query.amortizationPeriod)
    res.json({ message: mortgageAmountResponse.mortgageAmount });   
});

/* 
PATCH /interest-rate
Change the interest rate used by the application
Params: (in request body as JSON)
Interest Rate
Return:
message indicating the old and new interest rate in JSON format
*/
router.patch('/interest-rate', function(req, res) {
    if(req.body.rate)
        mortgage.updateInterestRate(req.body.rate / 100)
    else 
        res.status(500).json({message: `Ensure to include 'rate' in the request body`})
    res.json({ interestRate: `Updated to ${req.body.rate}%` });   
});

router.get('/interest-rate', function(req, res) {
    res.json({ interestRate: mortgage.getInterestRate() });   
});

// all of our routes will be prefixed with /api
app.use('/api', router);

// Turn on that server!
app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});