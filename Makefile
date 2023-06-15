.PHONY: build run check frontcheck isort black flake8 mypy test pytest clear bash

build:
	docker-compose build

up:
	docker-compose up

check:
	docker-compose run --rm web isort --check-only .
	docker-compose run --rm web black --check .
	docker-compose run --rm web flake8 .
	docker-compose run --rm web mypy .

frontcheck:
	docker-compose run frontend npm run --rm check

isort:
	docker-compose run --rm web isort .

black:
	docker-compose run --rm web black .

flake8:
	docker-compose run --rm web flake8 .

mypy:
	docker-compose run --rm web mypy .

supercode: isort black flake8 mypy

test:
	docker-compose run --rm web pytest
	docker-compose run frontend npm run --rm test

pytest:
	docker-compose run --rm web pytest

pytest_module:
	docker-compose run --rm web pytest $(module)/

clear:
	docker-compose down -v
	docker system prune --force
	docker volume prune --force

bash:
	docker exec -it leadin_web_1 /bin/bash

shell:
	docker exec -it leadin_web_1 python manage.py shell
