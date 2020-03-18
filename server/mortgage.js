var util = require('./util.js')
var interestRate = 2.5 / 100

/*
GET /payment-amount
Get the recurring payment amount of a mortgage
Params: (query string)
Asking Price
Down Payment*
Payment schedule***
Amortization Period**
Return:
Payment amount per scheduled payment in JSON format
*/

/* 
Down payment Insurance Cost
5-9.99%
3.15%

10-14.99%
2.4%

15%-19.99%
1.8%

20%+
N/A
*/

module.exports.getPaymentAmount = (askingPrice, downPayment, paymentSchedule, amortizationPeriod) => {
    // Build the response structure
    let response = {status: 200, returnReason: '', paymentAmount: '', timesPaid: ''}
    let fAskingPrice, fDownPayment, fAmortizationPeriod
    let timesPaidPerYear = 12 // timesPaidPerYear will change depending on paymentSchedule | 12 for monthly, | 26 for bi-weekly | 52 for weekly

    try {
        fAskingPrice = Number.parseFloat(askingPrice)
        fDownPayment = Number.parseFloat(downPayment)
        fAmortizationPeriod = Number.parseFloat(amortizationPeriod)
    } catch (e) {
        response.status = 500
        response.returnReason = `Float conversion error!`
        return response
    }

    timesPaidPerYear = util.calculateTimesPaidPerYear(paymentSchedule)

    if(timesPaidPerYear === -1) {
        response.status = 500
        response.returnReason = `Please choose one of weekly, bi-weekly or monthly for paymentSchedule. Got ${paymentSchedule}`
        return response
    }

    // Validate amortization period
    if(fAmortizationPeriod < 5 || fAmortizationPeriod > 25) {
        response.status = 500
        response.returnReason = `Amortization period must be between 5 and 25 (got ${amortizationPeriod})`
    }

    // Validate downpayment amount
    if(!util.validateDownPayment(fDownPayment, fAskingPrice)) {
        response.status = 500
        response.returnReason = `downPayment must be greater than the asking price, downPayment must be greater than 5% for loans of less than 500000, downPayment must be greater than 15% for loans of more than 500000`
    }

    //TODO: Add insurance!
    principal = fAskingPrice -fDownPayment

    // Determine times paying based on timesPaidPerYear and years.
    timesPaid = amortizationPeriod * timesPaidPerYear

    // Determinei interest per payment (interest Rate / timesPaidPerYear)
    monthlyInterest = interestRate / timesPaidPerYear

    paymentAmount = util.calculateMonthlyPayment(principal, monthlyInterest, timesPaid)

    response.paymentAmount = paymentAmount
    response.timesPaid = timesPaid
    response.totalPaid = timesPaid * paymentAmount
    return response
}

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

module.exports.getMortgageAmount = (paymentAmount, paymentSchedule, amortizationPeriod) => {
    // Build the response structure
    let response = {status: 200, returnReason: '', mortgageAmount: ''}

    console.log("getMortgageAmount", paymentAmount, paymentSchedule, amortizationPeriod)
    let fPaymentAmount, fPaymentSchedule, fAmortizationPeriod

    timesPaidPerYear = util.calculateTimesPaidPerYear(paymentSchedule)

    try {
        fPaymentAmount = Number.parseFloat(paymentAmount)
        fPaymentSchedule = Number.parseFloat(paymentSchedule)
        fAmortizationPeriod = Number.parseFloat(amortizationPeriod)
    } catch (e) {
        response.status = 500
        response.returnReason = `Float conversion error!`
        return response
    }

    // Determine times paying based on timesPaidPerYear and years.
    timesPaid = fAmortizationPeriod * timesPaidPerYear

    // Determine interest per payment (interest Rate / timesPaidPerYear)
    monthlyInterest = interestRate / timesPaidPerYear

    response.mortgageAmount = util.calculateMaxMortgage(fPaymentAmount, monthlyInterest, timesPaid)

    return response
}

module.exports.updateInterestRate = (newRate) => {
    interestRate = newRate
    console.log("updateInterestRate", interestRate)
}

module.exports.getInterestRate = () => {
    console.log("getInterestRate", interestRate)
    return interestRate
}