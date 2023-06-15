from environs import Env

env = Env()
env.read_env()

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

PSQL_USER = env("POSTGRES_USER", "postgres")
PSQL_PASSWORD = env("POSTGRES_PASSWORD", "postgres")
PSQL_HOST = env("POSTGRES_HOST", "db")
PSQL_PORT = env("POSTGRES_PORT", "5432")
PSQL_DB = env("POSTGRES_DB", "postgres")


SQLALCHEMY_DATABASE_URL = f"postgresql://{PSQL_USER}:{PSQL_PASSWORD}@{PSQL_HOST}:{PSQL_PORT}/{PSQL_DB}"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
