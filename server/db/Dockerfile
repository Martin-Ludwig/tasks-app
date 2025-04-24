FROM postgres

ENV POSTGRES_PASSWORD_FILE=/run/secrets/postgres-passwd
ENV POSTGRES_PASSWORD
ENV PGDATA
-v /custom/mount:/var/lib/postgresql/data
