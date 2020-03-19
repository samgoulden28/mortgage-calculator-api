/* Calculate times paid per year.
 *
 * Takes a payment frequency and returns the amount of times 
 * per year the payment will be made
 * 
 * returns -1 if the input was not valid
 * 
 * @param {string} paymentSchedule one of 'weekly', 'bi-weekly' or 'monthly'
 * @return {int} times paid per year
 */
module.exports.calculateTimesPaidPerYear = (paymentSchedule) => {
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

/* Calculate Mortgage Insurance
 *
 * Calculate the mortgage insurance based on fixed amounts:
 * Down payment Insurance Cost
 * 5-9.99% 3.15%
 * 10-14.99% 2.4%
 * 15%-19.99% 1.8%
 * 20%+ N/A
 * 
 * @param {float} downPayment 
 * @param {float} askingPrice 
 * @return {float} result The calculated mortgage insurance
 */
module.exports.calculateMortgageInsurance = (downPayment, askingPrice) => {
    let downPaymentPercentage = downPayment / askingPrice * 100

    let insuranceCostPercentage = 0

    if(downPaymentPercentage >= 5 && downPaymentPercentage < 10) insuranceCostPercentage = 3.15
    if(downPaymentPercentage >= 10 && downPaymentPercentage < 15) insuranceCostPercentage = 2.4
    if(downPaymentPercentage >= 15 && downPaymentPercentage < 20) insuranceCostPercentage = 1.8
    
    result = askingPrice * (insuranceCostPercentage / 100)

    return result
}

/* Validate Down Payment
 *
 * Validate down payment based on rules provided:
 * Must be at least 5% of first $500k plus 10% of any amount above $500k (So $50k on a $750k mortgage)
 * 
 * @param {float} downPayment
 * @param {float} askingPrice
 *  
 * @return {bool} whether down payment is valid
 */
module.exports.validateDownPayment = (downPayment, askingPrice) => {
    // downPayment must be greater than the asking price
    if(downPayment >= askingPrice) {
        return false
    }
    // downPayment must be greater than 5% for loans of less than 500000
    if(askingPrice <= 500000 && downPayment < askingPrice * 0.05) {
        return false
    }
    // downPayment must be greater than 15% for loans of more than 500000
    if(askingPrice > 500000 && downPayment < askingPrice * 0.15) {
        return false
    } 
    return true
}

/* Calculate monthly payment
 *
 * Calculate monthly payment of a mortgage loan based on the payment
 * equation from https://www.wikihow.com/Calculate-Mortgage-Payments
 * 
 * @param {float} principal The mortgage principal (Total of loan)
 * @param {float} rate Amount paid per payment interval
 * @param {int} timesPaid Amount of times per year payment will be made
 *  
 * @return {float} Monthly payment of the mortgage
 */

module.exports.calculateMonthlyPayment = (principal, rate, timesPaid) => {
    let x = rate * Math.pow((1 + rate), timesPaid)
    let y = (Math.pow((1 + rate), timesPaid) - 1)
    let z = (x / y)

    // Round to 6 decimal places to keep in step with formula from WikiHow
    z = Number.parseFloat(z).toFixed(6)

    // Get the final answer
    let a = principal * z

    // Round the final answer to 2 decimal places
    return Number.parseFloat(a).toFixed(2);
}

/* Calculate maximum mortgage
 *
 * Calculate monthly payment of a mortgage loan based on the payment
 * equation from https://www.wikihow.com/Calculate-Mortgage-Payments
 * 
 * I rearranged this equation to determine the principal instead of monthy payment
 * 
 * @param {float} monthlyPayment The arranged monthly payment of the loan
 * @param {float} rate Amount paid per payment interval
 * @param {int} timesPaid Amount of times per year payment will be made
 *  
 * @return {float} maximum borrow amount based on interest
 */

module.exports.calculateMaxMortgage = (monthlyPayment, rate, timesPaid) => {

    let x = rate * Math.pow((1 + rate), timesPaid)
    let y = (Math.pow((1 + rate), timesPaid) - 1)
    let z = (x / y)

    // Round to 6 decimal places to keep in step with formula from WikiHow
    z = Number.parseFloat(z).toFixed(6)

    // Get the final answer
    let a = monthlyPayment / z

    // Round the final answer to 2 decimal places
    return Number.parseFloat(a).toFixed(2)
}