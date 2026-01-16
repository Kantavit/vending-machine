from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phoneNumber = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=True)
    role = Column(String(50), default="USER", nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())

class Product(Base):
    __tablename__ = "Product"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    quantity = Column(Integer, default=0, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    updatedAt = Column(DateTime(timezone=True), default=func.now(), onupdate=func.now())

class PaymentTransaction(Base):
    __tablename__ = "PaymentTransaction"

    id = Column(Integer, primary_key=True, index=True)
    paymentAmount = Column(Integer, nullable=False)
    changeAmount = Column(Integer, nullable=False)
    createdAt = Column(DateTime(timezone=True), server_default=func.now())
    userId = Column(Integer, nullable=False) # Simplified lookup, ideally ForeignKey("User.id")

class PaymentInput(Base):
    __tablename__ = "PaymentInput"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String(10), nullable=False) # Storing Enum as String for simplicity
    amount = Column(Integer, nullable=False)
    paymentTransactionId = Column(Integer, nullable=False) # Simplified lookup, ideally ForeignKey("PaymentTransaction.id")

class TransactionItem(Base):
    __tablename__ = "TransactionItem"

    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False)
    priceAtPurchase = Column(Integer, nullable=False)
    productId = Column(Integer, nullable=False)
    paymentTransactionId = Column(Integer, nullable=False)
