from fastapi import FastAPI
from models.schema import CardSchema
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.add_middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get('/')
def home():
    return{'detail': 'Welcome to the homepage'}


@app.post('/payment')
def make_card_payment(data: CardSchema):
    return {'detail': {'success': 'Card verified. Payment is being processed'}}
    