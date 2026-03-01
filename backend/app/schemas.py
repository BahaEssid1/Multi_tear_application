from pydantic import BaseModel
from decimal import Decimal


class ProductBase(BaseModel):
    name: str
    price: Decimal
    quantity: int


class ProductCreate(ProductBase):
    pass


class ProductUpdate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True  # allows SQLAlchemy models to work with Pydantic
