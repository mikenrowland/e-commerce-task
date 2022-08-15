import re
from datetime import date
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, root_validator
regexDigit = "^[0-9]+$"
regexLength = "^.{16,19}$"


app = FastAPI()

current_year = date.today().year
current_month = date.today().month

class CardSchema(BaseModel):
    card_number: str = Field(...)
    expiry_year: str = Field(...)
    expiry_month: str = Field(...)
    card_cvv: str = Field(...)

    @root_validator(pre=True)
    @classmethod
    def validate_year_date(cls, values):
        year = values.get('expiry_year')
        month = values.get('expiry_month')
        error_msg = None

        if len(str(year)) != 4 or not re.match(regexDigit, year):
            error_msg = f"Invalid year format '{year}', must contain 4 digits",
        elif not re.match(regexDigit, month) or int(month) < 1 or int(month) > 12:
            error_msg = f"Month '{month}' not valid, must be between 1 and 12",
        elif int(year) < current_year or int(month) < current_month:
            error_msg = "Invalid! Card Expired",
        if error_msg:    
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg,
            )
        return values
    
    @root_validator(pre=True)
    @classmethod
    def validate_number_cvv(cls, values):
        number = values.get('card_number')
        cvv = str(values.get('card_cvv'))
        error_msg = None
        print(len(number))

        if not re.match(regexDigit, number):
            error_msg = "Invalid! Card number must contain only integers"
        elif not re.match(regexLength, number):
            error_msg = "Invalid! Card number must be between 16 and 19 digits"
        elif len(cvv) < 3 or len(cvv) > 4:
            error_msg = "Invalid! CVV Number must be 3 or 4 digits"
        elif (len(cvv) == 4 and number[:2] not in ['34', '37']) or \
            (len(cvv) != 4 and number[:2] in ['34', '37']):
            error_msg = "Invalid CVV Number"
        if error_msg:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=error_msg
            )
        return values


@app.get('/')
def home():
    return{'detail': 'Welcome to the nomepage'}


@app.post('/payment')
def make_card_payment(data: CardSchema):
    data.expiry_month = int(data.expiry_month)
    return{'data': data}
