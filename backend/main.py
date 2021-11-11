from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi import status

import database as db
import auth

app = FastAPI()


class LoginForm(BaseModel):
    id: int
    password: str


@app.post("/login")
async def login(login_form: LoginForm):
    user = auth.authenticate_user(login_form.id, login_form.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = auth.create_access_token(
        data={"sub": user.username}
    )

    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/me")
async def login(current_user: auth.User = Depends(auth.get_current_user)):
    return current_user
