from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi import status
from pydantic.main import BaseModel

import database as db
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from os import environ


class User(BaseModel):
    id: str
    pass_hash: Optional[str] = None

    name: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

SECRET_KEY = environ["SECRET_KEY"]
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES = timedelta(days=30)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(uid: int, password: str):
    user = db.users.find_one({
        "_id": uid
    })

    if user is None or not verify_password(password, user["pass_hash"]):
        return False

    return user


def create_access_token(data: dict):
    to_encode = data.copy()

    to_encode.update({"exp": ACCESS_TOKEN_EXPIRES.total_seconds()})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        uid: int = payload.get("sub")
        if uid is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    user = db.users.find_one({
        "_id": uid,
    })
    if user is None:
        raise credentials_exception

    return user