# EVALUATION TASK

## Validate Credit Card Details

### Description

A mini project simulating an e-commerce credit card payment page for validating credit card details before processing payment.

### Task

The project is split into two parts, Frontend and Backend

* Implement a simple page with an input form to take in credit card information and send it to a Backend API for validation

* The Backend API will respond with either success or failure, and you will react appropriately in the Frontend

* All validations should be done on the server side

The validation algorithm should handle the following:

* The expiry date of the credit card (year and month) must be AFTER present time

* The CVV (security code) of the credit card must be exactly 3 digits long

    * Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long
    * American Express are cards whose PAN (card numbers) starts with either “34” or “37”

* The PAN (card number) is between 16 and 19 digits long

* Last digit of the PAN (card number) is checked using Luhn’s algorithm