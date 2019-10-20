init-db:
	sudo docker run \
		--name meetup-postgres \
		-e POSTGRES_PASSWORD=postgres \
		-p 5432:5432 \
		-d postgres; \

	sleep 3s; \

	adonis migration:run
	make import-cities
	adonis seed


import-cities:
	sudo docker run --env PGPASSWORD=postgres --rm --network=host -v `pwd`:/data postgres \
  psql -h localhost -p 5432 -U postgres -c \
    "\\copy cities(name, country, subCountry, id) FROM '/data/world-cities.csv' WITH csv";

rm-db:
	sudo docker rm -f meetup-postgres

remake-db:
	make rm-db; \
	make init-db
