from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    phoneNumber: Optional[str] = None
    email: Optional[str] = None
    role: str = "USER"

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phoneNumber: Optional[str] = None
    email: Optional[str] = None
    role: Optional[str] = None

class User(UserBase):
    id: int
    createdAt: datetime

    class Config:
        from_attributes = True

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

class Product(ProductBase):
    id: int
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

from enum import Enum

class CashType(str, Enum):
    COIN = "COIN"
    BILL = "BILL"

class PaymentInputBase(BaseModel):
    type: CashType
    amount: int
    paymentTransactionId: int

class PaymentInputCreate(PaymentInputBase):
    pass

class PaymentInput(PaymentInputBase):
    id: int

    class Config:
        from_attributes = True

class PaymentTransactionBase(BaseModel):
    paymentAmount: int
    changeAmount: int
    userId: int

class PaymentTransactionCreate(PaymentTransactionBase):
    pass

class PaymentTransaction(PaymentTransactionBase):
    id: int
    createdAt: datetime
    # paymentInputs: list[PaymentInput] = [] 

    class Config:
        from_attributes = True

class TransactionItemBase(BaseModel):
    quantity: int
    priceAtPurchase: int
    productId: int
    paymentTransactionId: int

class TransactionItemCreate(TransactionItemBase):
    pass

class TransactionItem(TransactionItemBase):
    id: int

    class Config:
        from_attributes = True
