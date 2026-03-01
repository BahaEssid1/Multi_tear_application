from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


@router.get("/", response_model=list[schemas.Product], status_code=status.HTTP_200_OK)
def get_products(db: Session = Depends(database.get_db)):
    return crud.get_products(db)


@router.get("/{product_id}", response_model=schemas.Product, status_code=status.HTTP_200_OK)
def get_product(product_id: int, db: Session = Depends(database.get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("/", response_model=schemas.Product, status_code=status.HTTP_201_CREATED)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    return crud.create_product(db, product)


@router.put("/{product_id}", response_model=schemas.Product, status_code=status.HTTP_200_OK)
def update_product(product_id: int, product: schemas.ProductUpdate, db: Session = Depends(database.get_db)):
    updated = crud.update_product(db, product_id, product)
    if not updated:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return updated


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(database.get_db)):
    deleted = crud.delete_product(db, product_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return
