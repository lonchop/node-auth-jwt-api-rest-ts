PROJECT_NAME = proyecto-node-jwt-ts
DOCKER_COMPOSE_FILE = docker-compose.yml

run:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) up -d

down:
	docker compose -p $(PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE) down

# Ejecutar las migraciones de Prisma
migrate:
	npx prisma migrate dev --name init

# Resetear la base de datos
migrate-reset:
	npx prisma migrate reset