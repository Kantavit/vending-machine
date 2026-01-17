from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class ProductBase(BaseModel):
    name: str
    price: int
    quantity: Optional[int] = 0

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    quantity: Optional[int] = None

class ProductQuantityUpdate(BaseModel):
    id: int
    quantity: int

class Product(ProductBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class MoneyType(str, Enum):
    COIN = "COIN"
    BILL = "BILL"

class MoneyBase(BaseModel):
    name: str
    type: MoneyType
    amount: int

class MoneyCreate(MoneyBase):
    pass

class MoneyUpdate(BaseModel):
    name: str
    amount: int

class Money(MoneyBase):
    id: int
    createdAt: datetime
    updatedAt: Optional[datetime]

    class Config:
        from_attributes = True

class MoneyChangeRequest(BaseModel):
    change_amount: int

class ChangeItem(BaseModel):
    id: int
    name: str
    type: MoneyType
    amount: int

class MoneyChangeResponse(BaseModel):
    changesTotal: int
    changeMoney: List[ChangeItem]

