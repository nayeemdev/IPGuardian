help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  build       to build docker containers"
	@echo "  start       to start docker containers"
	@echo "  stop        to stop docker containers"
	@echo "  fresh       to stop and start docker containers"
	@echo "  ps          to show docker containers"
	@echo "  restart     to restart docker containers"
	@echo "  api-sh      to enter api container"
	@echo "  client-sh   to enter client container"
build:
	docker-compose build
start:
	docker-compose up -d
stop:
	docker-compose down
fresh:
	docker-compose down && docker-compose up -d --build
ps:
	docker-compose ps
restart:
	docker-compose restart
api-sh:
	docker-compose exec api sh
client-sh:
	docker-compose exec client sh
test:
	docker-compose exec api php artisan test