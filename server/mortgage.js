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

    timesPaidPerYear = calculateTimesPaidPerYear(paymentSchedule)

    if(timesPaidPerYear === -1) {
        response.status = 500
        response.returnReason = `Please choose one of weekly, bi-weekly or monthly for paymentSchedule. Got ${paymentSchedule}`
        return response
    }

    // Validate amortization period
    if(fAmortizationPeriod < 5 || fAmortizationPeriod > 25) {
        response.status = 500
        response.returnReason = `Amortization period must be between 5 and 25 (got ${fAmortizationPeriod})`
    }

    // Validate downpayment amount
    if(!validateDownPayment(fDownPayment, fAskingPrice)) {
        response.status = 500
        response.returnReason = `downPayment must be greater than the asking price, downPayment must be greater than 5% for loans of less than 500000, downPayment must be greater than 15% for loans of more than 500000`
    }

    //TODO: Add insurance!
    principal = fAskingPrice - downPayment

    // Determine times paying based on timesPaidPerYear and years.
    timesPaid = amortizationPeriod * timesPaidPerYear

    // Determinei interest per payment (interest Rate / timesPaidPerYear)
    monthlyInterest = interestRate / timesPaidPerYear

    paymentAmount = calculateMonthlyPayment(principal, monthlyInterest, timesPaid)

    response.paymentAmount = paymentAmount
    response.timesPaid = timesPaid
    response.totalPaid = timesPaid * paymentAmount
    return response
}

const calculateTimesPaidPerYear = (paymentSchedule) => {
    // Validate the payment schedule format.
    switch (paymentSchedule) {
        case 'weekly':
            return 52
        case 'bi-weekly':
            return 26
        case 'monthly':
            return 12
        default:
            return -1
    }
}

const validateDownPayment = (downPayment, askingPrice) => {
    console.log(downPayment, askingPrice, askingPrice * 0.05, askingPrice * 0.15)
    // downPayment must be greater than the asking price
    if(downPayment >= askingPrice) {
        console.log(1)
        return false
    }
    // downPayment must be greater than 5% for loans of less than 500000
    if(askingPrice <= 500000 && downPayment < askingPrice * 0.05) {
        console.log(2)
        return false
    }
    // downPayment must be greater than 15% for loans of more than 500000
    if(askingPrice > 500000 && downPayment < askingPrice * 0.15) {
        console.log(3)
        return false
    } 
    return true
}

const calculateMonthlyPayment = (principal, rate, timesPaid) => {
    console.log(principal, rate, timesPaid)
    /* Payment equation from:
    /* https://www.wikihow.com/Calculate-Mortgage-Payments
    */

    let x = rate * Math.pow((1 + rate), timesPaid)
    let y = (Math.pow((1 + rate), timesPaid) - 1)
    let z = (x / y)

    // Round to 6 decimal places to keep in step with formula from WikiHow
    z = Number.parseFloat(z).toFixed(6)

    // Get the final answer
    let a = principal * z

    console.log(`principal: ${principal} * (x: ${x} / y: ${y})`)

    // Round the final answer to 2 decimal places
    return Number.parseFloat(a).toFixed(2);
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

module.exports.getInterestRate = () => {
    console.log("getInterestRate", interestRate)
    return interestRate
}