WEB_PORT ?= 3000

.PHONY: help install dev build start typecheck lint validate clean docker-build docker-up docker-down docker-logs docker-shell

help:
	@echo "Available targets:"
	@echo "  make install       Install npm dependencies"
	@echo "  make dev           Run the Next.js dev server"
	@echo "  make build         Build the app"
	@echo "  make start         Run the production server after build"
	@echo "  make typecheck     Run TypeScript checks"
	@echo "  make lint          Run lint checks"
	@echo "  make validate      Run typecheck and build"
	@echo "  make clean         Remove generated Next.js output"
	@echo "  make docker-build  Build the production Docker image"
	@echo "  make docker-up     Build and run the production container"
	@echo "  make docker-down   Stop Docker Compose services"
	@echo "  make docker-logs   Follow web container logs"
	@echo "  make docker-shell  Open a shell in a one-off web container"
	@echo "  make WEB_PORT=3001 docker-up  Run the container on a different host port"

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

typecheck:
	npm run typecheck

lint:
	npm run lint

validate: typecheck build

clean:
	rm -rf apps/web/.next

docker-build:
	docker compose build

docker-up:
	WEB_PORT=$(WEB_PORT) docker compose up --build

docker-down:
	docker compose down

docker-logs:
	docker compose logs -f web

docker-shell:
	docker compose run --rm web sh
