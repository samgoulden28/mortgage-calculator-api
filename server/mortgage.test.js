const mortgage = require('./mortgage');
const mortgageMocks = require('./mocks/mortgage-mocks.js')

beforeEach(() => {
    mortgage.updateInterestRate(0.025);
});

describe('Monthly Payments', () => {
    // Golden path case for get payment amount
    test('Get monthly payment for 25 year loan of 105000, interest rate of 2.5% and down payment of 6000', () => {
        expect(mortgage.getPaymentAmount(105000, 6000, 'monthly', 25)).toMatchObject(mortgageMocks.mockCorrectPaymentAmountResponse);
    });

    // Golden path case for get payment amount on large loan and different interest rate
    test('Get weekly payment for 15 year loan of 1000000, interest rate of 1.5% and down payment of 200000', () => {
        mortgage.updateInterestRate(0.015);
        expect(mortgage.getPaymentAmount(1000000, 200000, 'weekly', 15)).toMatchObject(mortgageMocks.mockCorrectPaymentAmountResponseLargeLoan);
    });

    // Validate downpayments must be above 5% of loan amount (for loan of 500000 or less)
    test('Get monthly payment for 15 year loan of 400000, interest rate of 2.5% and down payment of 1000', () => {
        expect(mortgage.getPaymentAmount(400000, 1000, 'monthly', 15)).toMatchObject(mortgageMocks.mockInvalidDownpaymentError);
    });

    // Validate downpayments must be above 15% of loan amount (for loan of 500000 or less)
    test('Get monthly payment for 15 year loan of 600000, interest rate of 2.5% and down payment of 89000', () => {
        expect(mortgage.getPaymentAmount(600000, 89000, 'monthly', 15)).toMatchObject(mortgageMocks.mockInvalidDownpaymentError);
    });

    // Validate you cannot pass non number values as arguments
    test('Get monthly payment for 15 year loan of "foobar", interest rate of 2.5% and down payment of "sharks"', () => {
        expect(mortgage.getPaymentAmount("foobar", "sharks", 'monthly', 15)).toMatchObject(mortgageMocks.mockFloatConversionError);
    });

    // Validate you cannot pass an invalid payment schedule
    test('Get bi-yearly payment for 15 year loan of 100000, interest rate of 2.5% and down payment of 20000', () => {
        expect(mortgage.getPaymentAmount(100000, 20000, 'bi-yearly', 15)).toMatchObject(mortgageMocks.mockInvalidPaymentSchedule);
    });

    // Validate amortization period must be atleast 5 years
    test('Get monthly payment for 1 year loan of 105000, interest rate of 2.5% and down payment of 6000', () => {
        expect(mortgage.getPaymentAmount(105000, 6000, 'monthly', 1)).toMatchObject(mortgageMocks.mockInvalidLowAmortizationPeriod);
    });

    // Validate amortization period must be fewer than 25 years
    test('Get monthly payment for 26 year loan of 105000, interest rate of 2.5% and down payment of 6000', () => {
        expect(mortgage.getPaymentAmount(105000, 6000, 'monthly', 26)).toMatchObject(mortgageMocks.mockInvalidHighAmortizationPeriod);
    });
})

describe('Max Mortgage', () => {
    // Golden path test for max mortgage 
    test('Get max mortgage amount for a 2.5% 25 year loan with a monthly payment of 180', () => {
        expect(mortgage.getMortgageAmount(180, 'monthly', 25)).toMatchObject(mortgageMocks.mockCorrectMaxMortgageResponse);
    });

    // Golden path case for get payment amount on large loan and different interest rate
    test('Get max mortgage amount for a 5% 15 year loan with a weekly payment of 45', () => {
        mortgage.updateInterestRate(0.05);
        expect(mortgage.getMortgageAmount(45, 'weekly', 15)).toMatchObject(mortgageMocks.mockCorrectMaxMortgageResponseSmallPayment);
    });

    // Validate you cannot pass non number values as arguments
    test('Get monthly payment for 15 year loan of "foobar", interest rate of 2.5% and down payment of "sharks"', () => {
        expect(mortgage.getPaymentAmount("foobar", "sharks", 'monthly', 15)).toMatchObject(mortgageMocks.mockFloatConversionError);
    });
})

describe('Update interest rate', () => {
    // Golden path test for max mortgage 
    test('Update interest rate to 20%', () => {
        expect(mortgage.updateInterestRate(0.2))
        expect(mortgage.getInterestRate()).toBe("0.2000")
    });
})