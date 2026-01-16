from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models
import schemas
import database

router = APIRouter(
    prefix="/payment-transactions",
    tags=["payment-transactions"]
)

@router.get("/", response_model=List[schemas.PaymentTransaction])
async def get_payment_transactions(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.PaymentTransaction).offset(skip).limit(limit))
    return result.scalars().all()

@router.get("/{transaction_id}", response_model=schemas.PaymentTransaction)
async def get_payment_transaction(transaction_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.PaymentTransaction).filter(models.PaymentTransaction.id == transaction_id))
    transaction = result.scalars().first()
    if transaction is None:
        raise HTTPException(status_code=404, detail="Payment transaction not found")
    return transaction
