import pymongo
import os


class InconsistentEnvironmentError(BaseException):
    def __init__(self, variable):
        self.variable = variable

    def __str__(self):
        return f"You need to specify {self.variable} evironment variable to start server"


MONGO_URI = os.getenv("MONGO_URI")
print(MONGO_URI)
if not MONGO_URI:
    raise InconsistentEnvironmentError("MONGO_URI")


_db = pymongo.MongoClient(MONGO_URI)["geolin"]


users = _db["users"]
groups = _db.groups