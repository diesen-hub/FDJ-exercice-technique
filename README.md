## Requirements

- Docker (https://www.docker.com/get-started)
- Node.js and npm (https://nodejs.org/en/download/)

## Docker

We use Docker to run the application in a containerized environment. This allows us to have a consistent environment across all developers.

Containers :

- API : NestJS
- Client : Angular
- Database : PostgresSQL
- Adminer : Database management

### Commands

**Only run the following command at the root of the folder!**

#### Build/Rebuild and start the application

```bash
$ docker-compose --env-file ./common/env/local.env up --build
```

## Database

Your database is located at the root of the project in the "postgres-data" folder.

To reset the database, simply delete the "postgres-data" folder.
