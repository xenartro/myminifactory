# MyMiniFactory coding challenge

## Prerequisites

- Docker
- NodeJS
- Yarn or NPM

## Features

- Docker images
- PHP 7.4
- React
- TypeScript

## Steps to run

- Build and start the containers: `docker-compose up -d --build` in the root folder.
- Install frontend dependencies: `yarn install` or `npm install` in the `app/` folder.
- Create the database and run the migrations:
  - `docker-compose exec php bash`
  - `php bin/console doctrine:database:create`
  - `php bin/console doctrine:migrations:migrate`
- Start the frontend application: `yarn encore dev` in the `app/` folder.
- Add `myminifactory.local` to your hosts files pointing to 127.0.0.1
- Open a browser in http://myminifactory.local:8080/

## Not implemented but nice to haves

- Prettier to format JS files.
- php-cs-fixer to format PHP files.
- PHP unit tests.
- React unit tests with React Testing Library.

## Application resiliency to traffic

> The application should be resilient to large amounts of traffic at very specific hours of the
day. This should be taken into account when writing the configuration files.

There is no configuration that I know that handles that in Symfony out of the box.
Also, application performance improvements are usually handled after experiencing
them (see: early optimization) or point to specific issues (e.g. a given API endpoint
  or service).

One strategy could be to install and configure a [rate limiter](https://symfony.com/doc/current/rate_limiter.html).
Other strategies could involve a service like CloudFlare or using a cache layer
to retrieve frequently used data.
