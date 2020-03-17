var interestRate = 2.5

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

module.exports.getPaymentAmount = (askingPrice, downPayment, paymentSchedule, amortizationPeriod) => {
    // Build the response structure
    let response = {status: 200, returnReason: '', paymentAmount: ''}
    
    // Validate the payment schedule format.
    if(paymentSchedule !== 'weekly' &&
       paymentSchedule !== 'bi-weekly' &&
       paymentSchedule !== 'monthly'
    ) {
        response.status = 500
        response.returnReason = `Please choose one of weekly, bi-weekly or monthly for paymentSchedule. Got ${paymentSchedule}`
    }

    if(downPayment >= askingPrice) {
        response.status = 500
        response.returnReason = `downPayment (${downPayment} is greater or equal than askingPrice (${askingPrice}))`
    }

    response.paymentAmount = 20
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