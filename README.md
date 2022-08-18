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


### Technologies

* BACKEND - Python (FastApi)

* FRONTEND - HTML, CSS, JS (fetch API)


### How to Use

#### Setting up the server:

* Clone the project repository
* cd into the project repo and create your virtual environment using the command `python3 -m venv`
* Install dependencies using `pip install requirements.txt`
* cd into the backend folder and start the server using `uvicorn main:app --reload`

#### Setting up the frontend

* cd into the frontend folder and open the index.html file in your browser
* Fill the input fields and make a request