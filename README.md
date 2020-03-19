# mortgage-calculator-api

A mortgage calculator API built in Express/Node.js

## How to run

`npm start`

## Running the tests

`npm t`

## Endpoints

### GET /payment-amount

Returns amount required per payment interval

Query Parameters

askingPrice - Full asking price for the house
downPayment - Amount being presented as the downpayment
paymentSchedule - One of 'weekly', 'bi-weekly' or 'monthly'
amortizationPeriod - Full term in years of the mortgage

### GET /mortgage-amount

Returns maximum mortgage amount based on a monthly payment

Query Parameters

paymentAmount - Payment amount per interval
paymentSchedule - One of 'weekly', 'bi-weekly' or 'monthly'
amortizationPeriod - Full term in years of the mortgage

### PATCH /interest-rate

Modify the yearly interest rate of the mortgage

Body Parameters

rate - New yearly interest  rate

