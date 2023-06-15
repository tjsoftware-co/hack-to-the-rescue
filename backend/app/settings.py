import os

from pydantic import BaseSettings


class GlobalSettings(BaseSettings):
    project_name: str = "AuthenticAutism: Ensuring Accurate Knowledge for All"
    project_version: str = "0.0.1"


settings = GlobalSettings()
