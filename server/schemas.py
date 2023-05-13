from datetime import datetime
from pydantic import BaseModel

class ImageData(BaseModel):
    datauri: str
    batch_id: str
    
class ClassificationResultBase(BaseModel):
    class_name: str
    batch_id: str
    created_at: datetime
    probability: float = 0.0
    image_data: str = None


class ClassificationResult(ClassificationResultBase):
    pass

class ClassificationResultCreate(ClassificationResultBase):
    pass
