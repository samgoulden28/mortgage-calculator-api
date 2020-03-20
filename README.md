# mortgage-calculator-api

A mortgage calculator API built in Express/Node.js

## How to run

```
npm install
npm start
```

## Running the tests

`npm t`

## Notes
* Downpayments must be at least 5% of first $500k plus 10% of any amount above $500k (So $50k on a $750k
mortgage)
* Amortization period is min 5 years, max 25 years
* Payment schedule must be Weekly, biweekly, monthly
* Mortgage interest rate begins at 2.5% per year
* Mortgage insurance is required on all mortgages with less than 20% down. Insurance must be calculated and added to the mortgage principal. Mortgage insurance is not available for mortgages > $1 million.

#### Mortgage insurance rates are as follows:

Down payment | Insurance Cost

5-9.99% | 3.15%

10-14.99% | 2.4%

15%-19.99% | 1.8%

20%+ | N/A

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

