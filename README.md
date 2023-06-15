# AuthenticAutism: Ensuring Accurate Knowledge for All

## Challenge
In the era of digital communication, misinformation proliferates rapidly, particularly in the realm of health and
wellness. When this pertains to autism, erroneous information can lead to harmful treatment approaches. The "Recognize
Fake Information About Autism" project aims to leverage the power of generative AI to combat this threat. This advanced
tool will utilize AI to detect and debunk false information about autism circulating online. This would reduce the risk
of harmful treatments, enhance understanding about autism, and promote a safer, more informed digital community. By
ensuring accuracy in online autism discourse, we protect and empower individuals with autism and their families.


```bash
make build # a command to build a docker images
make run   # a command to run the containers (frontend, backend and database)
```

[Docker Compose](https://docs.docker.com/compose/install/) is leveraged
for reproducible builds and consistent local development environments.
The default [`docker-compose.yml`](docker-compose.yml) file is set up
to support local development with code reload and debug mode.

The [`Makefile`](Makefile) contains common commands that can be used to
build, run, and test the project. The most important commands include:
- `build`: builds the project with Docker Compose.
- `run`: runs the project with Docker Compose.
- `check`: performs backend static code checks.
- `frontcheck`: performs frontend static code checks.
- `test`: runs backend and frontend unit tests.
- `pytest`: runs backend unit tests.
- `pytest_module module={module_name}`: runs backend unit tests in passed module
- `clear`: stops the currently running services and removes the volumes.
- `bash`: enters an interactive console in the backend container.

If `build` doesn't run, uncheck "Use Docker Compose V2" in Docker Desktop settings.

### Application usage
The application has two endpoints one is for frontend and the second one is for backend API.
Frontend locally can be accessed through http://localhost:5173
Backend API can be accessed through http://localhost:80

#### Troubleshooting

In case of errors with typing or missing dependencies, try to rebuild the
Docker images:

```bash
make clear
docker-compose up --build --force-recreate
```

If `make` is not supported, the associated Docker Compose commands can be
used directly in order to build and run the project:

```bash
docker-compose build
docker-compose run
```

### Backend

All backend code must be formatted and verified by the `black`, `flake8`,
`mypy` and `isort` tools.

Custom functions and methods should use **type hints** to improve IDE code
completions, prevent from type errors and extend code documentation.

### Frontend

All frontend code must be formatted and verified by the `prettier`,
`eslint` and `tsc` tools. Pre-commit hooks can be set up with `husky`.
CSS class names should be defined according to the
[BEM](http://getbem.com/introduction/) methodology.

Whenever possible, prefer TypeScript over plain JavaScript.
