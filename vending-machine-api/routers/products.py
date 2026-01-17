from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List

import database
import models
import schemas

router = APIRouter(
    prefix="/products",
    tags=["products"],

)

@router.get("/", response_model=List[schemas.Product])
async def get_products(db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Product))
    products = result.scalars().all()
    return products

@router.post("/", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
async def create_product(product: schemas.ProductCreate, db: AsyncSession = Depends(database.get_db)):
    db_product = models.Product(**product.model_dump())
    db.add(db_product)
    await db.commit()
    await db.refresh(db_product)
    return db_product

@router.get("/{product_id}", response_model=schemas.Product)
async def get_product(product_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Product).where(models.Product.id == product_id))
    product = result.scalar_one_or_none()
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.patch("/{product_id}", response_model=schemas.Product)
async def update_product(product_id: int, product_update: schemas.ProductUpdate, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Product).where(models.Product.id == product_id))
    db_product = result.scalar_one_or_none()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    await db.commit()
    await db.refresh(db_product)
    return db_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(product_id: int, db: AsyncSession = Depends(database.get_db)):
    result = await db.execute(select(models.Product).where(models.Product.id == product_id))
    db_product = result.scalar_one_or_none()
    
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    await db.delete(db_product)
    await db.commit()

@router.patch("/", response_model=List[schemas.Product])
async def update_products_quantity(products_update: List[schemas.ProductQuantityUpdate], db: AsyncSession = Depends(database.get_db)):
    updated_products = []
    for product_update in products_update:
        result = await db.execute(select(models.Product).where(models.Product.id == product_update.id))
        db_product = result.scalar_one_or_none()
        
        if db_product is None:
            raise HTTPException(status_code=404, detail=f"Product with id {product_update.id} not found")
        
        if db_product.quantity < product_update.quantity:
            raise HTTPException(status_code=400, detail=f"Not enough quantity for product {product_update.id}")
        db_product.quantity -= product_update.quantity
        updated_products.append(db_product)
    
    await db.commit()
    for product in updated_products:
        await db.refresh(product)
    
    return updated_products
