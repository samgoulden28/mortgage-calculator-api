var interestRate = 10

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

module.exports.getPayment = (askingPrice, downPayment, paymentSchedule, amortizationPeriod) => {
    return `getPayment, ${askingPrice}, ${downPayment}, ${paymentSchedule}, ${amortizationPeriod})`
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

module.exports.getMortageAmount = (paymentAmount,  paymentSchedule, amortizationPeriod) => {
    console.log("getMortageAmount", paymentAmount,  paymentSchedule, amortizationPeriod)
}

module.exports.updateInterestRate = (newRate) => {
    interestRate = newRate
    console.log("updateInterestRate", interestRate)
}

module.exports.getInterestRate = (newRate) => {
    console.log("getInterestRate", interestRate)
}