from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime

import app_models, schemas

# ClassificationResult CRUD functions
def get_classification_result(db: Session, classification_result_id: int) -> Optional[app_models.ClassificationResult]:
    return db.query(app_models.ClassificationResult).filter(app_models.ClassificationResult.id == classification_result_id).first()

def get_classification_results(db: Session, batch_id: Optional[str] = None, skip: int = 0, limit: int = 100) -> List[app_models.ClassificationResult]:
    query = db.query(app_models.ClassificationResult)
    if batch_id:
        query = query.filter(app_models.ClassificationResult.batch_id == batch_id)
    return query.offset(skip).limit(limit).all()

def create_classification_result(db: Session, classification_result: schemas.ClassificationResultCreate) -> app_models.ClassificationResult:
    created_at = datetime.now()
    db_classification_result = app_models.ClassificationResult(
        class_name=classification_result.class_name,
        batch_id=classification_result.batch_id,
        created_at=created_at,
        probability=classification_result.probability,
        image_data=classification_result.image_data
    )
    db.add(db_classification_result)
    db.commit()
    db.refresh(db_classification_result)
    return db_classification_result
