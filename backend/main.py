from datetime import date
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field, root_validator


app = FastAPI()

current_year = date.today().year
current_month = date.today().month

class CardSchema(BaseModel):
    card_number: str = Field(..., min_length=16, max_length=19)
    expiry_year: int = Field(...)
    expiry_month: int = Field(...)
    card_cvv: int = Field(...)

    @root_validator(pre=True)
    @classmethod
    def validate_date(cls, values):
        year = values.get('expiry_year')
        month = values.get('expiry_month')
        if year < current_year or month < current_month:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid! Card Expired",
            )
        return values
    
    @root_validator(pre=True)
    @classmethod
    def validate_cvv(cls, values):
        number = values.get('card_number')
        cvv = values.get('card_cvv')
        if len(str(cvv)) < 3 or len(str(cvv)) > 4:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid! CVV Number must be 3 or 4 digits",
            )
        if number[:2] == '34' or number[:2] == '37' and len(str(cvv)) != 4:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid CVV Number",
            )

        return values


@app.get('/')
def home():
    return{'detail': 'Welcome to the nomepage'}


@app.post('/payment')
def make_card_payment(data: CardSchema):
    return{'data': data}
