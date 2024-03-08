# Used cars shop

This is an application that allows users to register and create advertisements for selling cars. It is built using `NestJS`, utilizing MySQL as the database and `Prisma` as the ORM for database interaction.

## Motivation

I've always dreamed of learning Prisma, so I chose it for this project. Additionally, I decided to try using Cookies for registration, which is a new experience for me.

## What I was learn

I've been working with `Prisma`, writing custom `middlewares` `interceptors`. I've deepened my understanding of the `NestJS` architecture and how it operates. I compared `Prisma` and `TypeOrm` and realized that they are two excellent tools. Currently, I prefer `Prisma` because it uses typed objects for complex queries, whereas `TypeOrm` utilizes `queryBuilder`, which can lead to type errors or queries. Additionally, `Prisma` has a neat schema creation language, which I found more convenient than decorators in `TypeOrm's` Entities.

---

# Instaling

## Prerequisites

Before you begin, ensure you have Node.js version 18.16.0 or later installed on your machine.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone <repository_url>
   ```

2. Install all dependencies:

   ```bash
   npm install
   ```

## Running with Docker (Optional)

If you prefer to use Docker, the repository contains a `docker-compose.yml` file. It includes configurations for the database and Adminer.

```bash
docker-compose up
```

If you choose to host the database locally, it's up to you. This app utilizes MySQL.

## Environment Configuration

The repository includes an `Example.env` file. You should create the following environment files:

- `.env`: Default environment for new scripts
- `.env.dev`: Used during development (`npm run start:dev`)
- `.env.e2e`: Used during end-to-end testing (`npm run test:e2e`)

You can use the `Example.env` file as a template.

## Running the Application

To run the application, use the following commands:

- **Development**:

  ```bash
  npm run start:dev
  ```

- **Production**:

  ```bash
  npm run build
  npm run start:prod
  ```

Once the application is running, you can access it via `http://localhost:3000/`.
