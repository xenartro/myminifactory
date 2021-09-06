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

- Build and start the containers: `docker-compose up -d --build`
- Install frontend dependencies: `yarn install` or `npm install`
- Create the database and run the migrations:
  - `docker-compose exec php bash`
  - `php bin/console doctrine:database:create`
  - `php bin/console doctrine:migrations:migrate`
- Start the frontend application: `yarn encore dev`
- Add `myminifactory.local` to your hosts files poiting to 127.0.0.1
- Open a browser in http://myminifactory.local:8080/

## Not implemented but nice to haves

- Prettier to format JS files.
- php-cs-fixer to format PHP files.
- PHP unit tests.
- React unit tests with React Testing Library.
