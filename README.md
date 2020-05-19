# Simple ordering application
This is an example of using Express.js and TypeORM with Typescript to demonstrate a simple and production ready RESTful ordering application using Google Map service. 

### Tech stack
* **Express.js**
* **Typescript**
* **TypeORM with MySQL**
* **Class-validator** - For validating the request input before API processing. 
* **Mocha** - A testing framework allows to run unit and integration tests.
* **Chai** - A BDD / TDD assertion library works together with **Mocha** to verify the test results.
* **Google Maps API** - https://cloud.google.com/maps-platform/routes/

### Prerequisites
* **Docker** - Follow instructions https://docs.docker.com/engine/installation/ to install Docker on your machine.

### Quickstart
1. Copy file .env.dist to .env
2. Paste your Google API key to `GOOGLE_MAP_API_KEY` in .env
3. Run `sh start.sh`
4. DB table will be created by the migration scripts
5. The application will run at: http://localhost:3000

If you intent to start the application in development, i.e. `npm run serve`, please change .env into:

```
...
TYPEORM_ENTITIES=src/entity/**/*.ts
TYPEORM_MIGRATIONS=src/migration/**/*.ts
TYPEORM_SUBSCRIBERS=src/subscriber/**/*.ts
```
