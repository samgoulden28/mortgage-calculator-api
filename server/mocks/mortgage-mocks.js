module.exports.mockCorrectPaymentAmountResponse = {
    status: 200,
    returnReason: '',
    paymentAmount: '458.95',
    timesPaid: 300,
    interest: '2.5%',
    principal: '102307.50',
    mortgageInsurance: '3307.50',
    totalPaid: '137685.00'
}

module.exports.mockCorrectPaymentAmountResponseLargeLoan = {
    status: 200,
    returnReason: '',
    paymentAmount: '1145.60',
    timesPaid: 780,
    interest: '1.5%',
    principal: '800000.00',
    mortgageInsurance: '0.00',
    totalPaid: '893568.00'
  }

module.exports.mockInvalidDownpaymentError = {
    status: 500,
    returnReason: 'downPayment must be greater than the asking price, downPayment must be greater than 5% for loans of less than 500000, downPayment must be greater than 15% for loans of more than 500000'
  }

module.exports.mockFloatConversionError = {
    status: 500,
    "returnReason": "Float conversion error!"
}

module.exports.mockInvalidPaymentSchedule = {
    status: 500,
    "returnReason": "Please choose one of weekly, bi-weekly or monthly for paymentSchedule. Got bi-yearly",
}

module.exports.mockInvalidLowAmortizationPeriod = {
    status: 500,
    "returnReason": "Amortization period must be between 5 and 25 (got 1)"
}

module.exports.mockInvalidHighAmortizationPeriod = {
    status: 500,
    "returnReason": "Amortization period must be between 5 and 25 (got 26)"
}

module.exports.mockCorrectMaxMortgageResponse = {
    status: 200,
    returnReason: '',
    mortgageAmount: '40124.83',
    interest: '2.5%'
}

module.exports.mockCorrectMaxMortgageResponseSmallPayment = {
    status: 200,
    returnReason: '',
    mortgageAmount: '24684.59',
    interest: '5%'
  }