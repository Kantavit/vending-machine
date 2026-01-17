
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

import database
import models
import schemas

router = APIRouter(
    prefix="/moneys",
    tags=["moneys"],
)

@router.get("/", response_model=List[schemas.Money])
async def get_moneys(db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Money))
    moneys = result.scalars().all()
    return moneys

@router.post("/add", response_model=List[schemas.Money])
async def add_moneys(money_updates: List[schemas.MoneyUpdate], db: AsyncSession = Depends(database.get_db)):
    updated_moneys = []
    
    for money_update in money_updates:
        result = await db.execute(select(models.Money).where(models.Money.name == money_update.name))
        db_money = result.scalar_one_or_none()
        
        if db_money:
            db_money.amount += money_update.amount
            updated_moneys.append(db_money)
    
    await db.commit()
    
    
    # Refresh all updated objects to get the latest state
    for money in updated_moneys:
        await db.refresh(money)
        
    return updated_moneys

@router.post("/return-change", response_model=schemas.MoneyChangeResponse)
async def return_change(request: schemas.MoneyChangeRequest, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Money))
    all_money = result.scalars().all()
    
    # Sort money by face value (name) descending
    def get_value(m):
        try:
            return int(m.name)
        except:
            return 0
            
    sorted_money = sorted(all_money, key=get_value, reverse=True)
    
    remaining_change = request.change_amount
    changes = []
    
    # Logic to calculate change
    updates = []
    
    for money in sorted_money:
        if remaining_change <= 0:
            break
            
        face_value = get_value(money)
        if face_value <= 0: continue
        
        if face_value <= remaining_change:
            count_needed = remaining_change // face_value
            count_take = min(count_needed, money.amount)
            
            if count_take > 0:
                updates.append((money, count_take))
                remaining_change -= count_take * face_value
                changes.append(schemas.ChangeItem(
                    id=money.id,
                    name=money.name,
                    type=money.type,
                    amount=count_take
                ))
                
    if remaining_change > 0:
        raise HTTPException(status_code=400, detail="Not enough change available")
        
    # Apply updates
    for money, count in updates:
        money.amount -= count
        
    await db.commit()
    
    return schemas.MoneyChangeResponse(
        changesTotal=request.change_amount,
        changeMoney=changes
    )
