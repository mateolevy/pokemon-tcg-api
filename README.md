### Pokémon TCG API

This project is an API centered around the Pokémon Trading Card Game (TCG), it provides a RESTful service to manage Pokémon trading cards with operations such as creating, updating, retrieving, and deleting card records. Additionally, it supports card battle simulations and identification of cards weaknesses and resistances.

#### Solution Overview

The solution leverages Node.js with the NestJS framework for backend API development, combining it with TypeORM for data management. The use of JWT for authentication ensures secure access to the API endpoints. The database is PostgreSQL, facilitated by Docker for local development setup.

#### Tools & Libraries used

- **NestJS:**

- **TypeORM:**

- **Docker:** Used to containerize the PostgreSQL database environment for consistent development setups.

- **Swagger:**

- **Jest:**

#### Environment Configuration

The application requires the following environment variables for local execution (provided in .env.example file):

```makefile
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=<database name>
JWT_SECRET=<strong random string>
```

These variables should be set according to your local or development database and security settings.

#### Running the project

## Requirements

- Docker

- Node 20.x

## Installation

```bash
$ yarn install
```

## Database Setup

```bash
$ docker compose up -d
```

## Run Migrations

```bash
# Run all pending migrations
$ yarn run migration:run
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Cloud Deployment

The api is deployed on Heroku. To deploy your changes, push your commits to the main branch, and Heroku will automatically build and deploy the latest version.
Visit the live api at: [https://pokemon-tcg-api-cookunity-20f6771efb1d.herokuapp.com/api/docs/](https://pokemon-tcg-api-cookunity-20f6771efb1d.herokuapp.com/api/docs/)
The DB is deployed in AWS RDS.
