NestJS architecture for generic integration of sensor with HATEOAS suggestions​

## Description

The purpose of this API is to facilitate communication with a decentralized network of sensors. 
It allows to retrieve data from various sensors (geolocation, type, etc.) and offers suggestions based on queries made through specialized services.

## Project setup

```bash
$ npm install
$ npm i -g @nestjs/cli
$ npm install exceljs --save
$ npm i --save @nestjs/microservices
$ npm i --save mqtt
$ npm i --save net

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Environment variables

Create and complete the .env file with database connection information by following the example below :

DB_NAME=dbnameexample
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=dbusernameexample
DB_PASSWORD=dbpwdexample

## Available features

-Get data of all sensors (+suggestions)
-Get data of one sensor by id (+suggestions)
-Get data of all sensors by location (+suggestions)
-Get data of all sensors by type (+suggestions)
-Create new sensor
-Update existing sensor
-Delete existing sensor

## Technologies used

-NestJs framework
-Mysql Database