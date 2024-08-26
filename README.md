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

## Run Migratons

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
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
