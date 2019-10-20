init-db:
	sudo docker run \
		--name meetup-postgres \
		-e POSTGRES_PASSWORD=postgres \
		-p 5432:5432 \
		-d postgres; \

	sleep 3s; \

	adonis migration:run
	adonis seed

rm-db:
	sudo docker rm -f meetup-postgres

remake-rb:
	make rm-db; \
	make init-db
