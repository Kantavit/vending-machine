from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models
import schemas
import database

router = APIRouter(
    prefix="/payment-inputs",
    tags=["payments"]
)

@router.get("/", response_model=List[schemas.PaymentInput])
async def read_payment_inputs(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.PaymentInput).offset(skip).limit(limit))
    payment_inputs = result.scalars().all()
    return payment_inputs

@router.get("/{payment_input_id}", response_model=schemas.PaymentInput)
async def read_payment_input(payment_input_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.PaymentInput).filter(models.PaymentInput.id == payment_input_id))
    payment_input = result.scalars().first()
    if payment_input is None:
        raise HTTPException(status_code=404, detail="Payment input not found")
    return payment_input
