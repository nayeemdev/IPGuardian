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
api-sh:
	docker-compose exec api sh
client-sh:
	docker-compose exec client sh