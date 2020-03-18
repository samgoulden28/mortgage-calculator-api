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

module.exports.validateDownPayment = (downPayment, askingPrice) => {
    console.log(downPayment, askingPrice, askingPrice * 0.05, askingPrice * 0.15)
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

module.exports.calculateMonthlyPayment = (principal, rate, timesPaid) => {
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

module.exports.calculateMaxMortgage = (monthlyPayment, rate, timesPaid) => {
    console.log(monthlyPayment, rate, timesPaid)
    /* Payment equation from:
    /* https://www.wikihow.com/Calculate-Mortgage-Payments
    */

    let x = rate * Math.pow((1 + rate), timesPaid)
    let y = (Math.pow((1 + rate), timesPaid) - 1)
    let z = (x / y)

    // Round to 6 decimal places to keep in step with formula from WikiHow
    z = Number.parseFloat(z).toFixed(6)

    // Get the final answer
    let a = monthlyPayment / z

    console.log(`monthlyPayment: ${monthlyPayment} / (x: ${x} / y: ${y})`)

    // Round the final answer to 2 decimal places
    return Number.parseFloat(a).toFixed(2);
}