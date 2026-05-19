# Challenge Application with BullMQ

## Description

A simple challenge project to simulate sending email with 20% failure chance and retrying using **BullMQ** + **NestJS**. It includes a BullMQ queue and worker that processes email jobs, automatically retrying failed attempts with configurable backoff strategies.

## Project setup

```bash
npm install
```

## Local development

1. **Start Redis** (required by BullMQ):

```bash
   docker run -d --name redis-challenge -p 6379:6379 redis:8.8-m03-alpine3.23
```

2. **Run the application**:

```bash
   npm run start:dev
```

The API will be available at `http://localhost:3000`.

## Build and run the production bundle locally

```bash
npm run build
node dist/main.js
```

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Docker Compose deployment

```bash
docker compose up -d --build
```

The application will be reachable at `http://localhost:4000`. Redis is available internally at `redis:6379`.

To stop:

```bash
docker compose down
```
