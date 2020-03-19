var util = require('./util.js')
// Interest rate starts at 2.5%
var interestRate = 2.5 / 100

/* Get payment amount
 *
 * Return the monthly payment amount of a loan based on provided parameters
 * 
 * @param {string} askingPrice The total asking price of the house
 * @param {string} downPayment Amount put forwards as the down payment
 * @param {string} paymentSchedule One of 'weekly', 'bi-weekly', or 'monthly'
 * @param {string} amortizationPeriod Total time of mortgage payment
 *  
 * @return {Object} response structure with information about payment amount or errors
 */

module.exports.getPaymentAmount = (askingPrice, downPayment, paymentSchedule, amortizationPeriod) => {
    // Build the response structure
    let response = {status: 200, returnReason: ''}
    let fAskingPrice, fDownPayment, fAmortizationPeriod
    let timesPaidPerYear = 12 // timesPaidPerYear will change depending on paymentSchedule | 12 for monthly, | 26 for bi-weekly | 52 for weekly

    fAskingPrice = Number.parseFloat(askingPrice)
    fDownPayment = Number.parseFloat(downPayment)
    fAmortizationPeriod = Number.parseInt(amortizationPeriod)

    if(isNaN(fAskingPrice) || isNaN(fDownPayment) || isNaN(fAmortizationPeriod)) {
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
        return response
    }

    // Validate downpayment amount
    if(!util.validateDownPayment(fDownPayment, fAskingPrice)) {
        response.status = 500
        response.returnReason = `downPayment must be greater than the asking price, downPayment must be greater than 5% for loans of less than 500000, downPayment must be greater than 15% for loans of more than 500000`
        return response
    }

    // Add the mortgage insurance
    mortgageInsurance = util.calculateMortgageInsurance(fDownPayment, fAskingPrice)

    // Calculate the total principal
    principal = ((fAskingPrice - fDownPayment) + mortgageInsurance)

    // Determine times paying based on timesPaidPerYear and years.
    timesPaid = amortizationPeriod * timesPaidPerYear

    // Determinei interest per payment (interest Rate / timesPaidPerYear)
    monthlyInterest = interestRate / timesPaidPerYear

    paymentAmount = util.calculateMonthlyPayment(principal, monthlyInterest, timesPaid)

    response.interest = (interestRate * 100) + '%'
    response.principal = principal.toFixed(2)
    response.mortgageInsurance = mortgageInsurance.toFixed(2)
    response.paymentAmount = paymentAmount
    response.timesPaid = timesPaid
    response.totalPaid = (timesPaid * paymentAmount).toFixed(2)
    return response
}

module.exports.sum = (num1, num2) => {
    return num1 + num2
}

/* Get Mortgage Amount
 *
 * Return the maximum possible mortgage amount given a payment amount and schedule
 * 
 * @param {string} paymentAmount Monthly payment amount for loan
 * @param {string} paymentSchedule One of 'weekly', 'bi-weekly', or 'monthly'
 * @param {string} amortizationPeriod Total time of mortgage payment
 *  
 * @return {Object} response structure with information about payment amount or errors
 */

module.exports.getMortgageAmount = (paymentAmount, paymentSchedule, amortizationPeriod) => {
    // Build the response structure
    let response = {status: 200, returnReason: '', mortgageAmount: ''}
    
    let fPaymentAmount, fAmortizationPeriod

    timesPaidPerYear = util.calculateTimesPaidPerYear(paymentSchedule)

    fPaymentAmount= Number.parseFloat(paymentAmount)
    fAmortizationPeriod = Number.parseInt(amortizationPeriod)

    if(isNaN(fPaymentAmount) || isNaN(fAmortizationPeriod)) {
        response.status = 500
        response.returnReason = `Float conversion error!`
        return response
    }

    // Determine times paying based on timesPaidPerYear and years.
    timesPaid = fAmortizationPeriod * timesPaidPerYear

    // Determine interest per payment (interest Rate / timesPaidPerYear)
    monthlyInterest = interestRate / timesPaidPerYear

    response.interest = (interestRate * 100) + '%'
    response.mortgageAmount = util.calculateMaxMortgage(fPaymentAmount, monthlyInterest, timesPaid)

    return response
}

/* Update Interest Rate
 *
 * Update the yearly interest rate to a new amount
 * 
 * @param {string} newRate new yearly insurance rate for mortgages
 * @return {Object} response structure with information about payment amount or errors
 */

module.exports.updateInterestRate = (newRate) => {
    interestRate = Number.parseFloat(newRate).toFixed(4)
}

module.exports.getInterestRate = () => {
    return interestRate
}