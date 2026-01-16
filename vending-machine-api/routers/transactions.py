from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models
import schemas
import database

router = APIRouter(
    prefix="/transactions",
    tags=["transactions"]
)

@router.get("/", response_model=List[schemas.TransactionItem])
async def get_all_transactions_input(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.TransactionItem).offset(skip).limit(limit))
    return result.scalars().all()

@router.get("/{transaction_item_id}", response_model=schemas.TransactionItem)
async def get_one_transactions_input(transaction_item_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.TransactionItem).filter(models.TransactionItem.id == transaction_item_id))
    transaction_item = result.scalars().first()
    if transaction_item is None:
        raise HTTPException(status_code=404, detail="Transaction item not found")
    return transaction_item
