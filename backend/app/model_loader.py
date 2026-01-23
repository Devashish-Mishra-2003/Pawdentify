import os
from pathlib import Path
import boto3

def download_model_from_s3():
    local_path = Path(os.getenv("LOCAL_MODEL_PATH"))

    # Ensure directory exists
    local_path.parent.mkdir(parents=True, exist_ok=True)

    # If model already exists, reuse it
    if local_path.exists():
        print("Model already exists locally.")
        return str(local_path)

    print("Downloading model from S3...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
        region_name=os.getenv("AWS_REGION"),
    )

    s3.download_file(
        os.getenv("S3_BUCKET"),
        os.getenv("S3_MODEL_KEY"),
        str(local_path)
    )

    print("Model downloaded successfully.")
    return str(local_path)
