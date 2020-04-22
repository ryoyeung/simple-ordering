# Simple ordering application
This is an example of using Express.js and TypeORM with Typescript to demonstrate a simple RESTful ordering application using Google Map service. 

### Quickstart
1. Copy file .env.dist to .env
2. Paste your Google API key to `GOOGLE_MAP_API_KEY` in .env
3. Run `sh start.sh`
4. DB table will be created by the migration scripts
5. The application will run at: http://localhost:3000

Google Maps API: https://cloud.google.com/maps-platform/routes/

If you intent to start the application in development, i.e. `npm run serve`, please change .env into:

```
...
TYPEORM_ENTITIES=src/entity/**/*.ts
TYPEORM_MIGRATIONS=src/migration/**/*.ts
TYPEORM_SUBSCRIBERS=src/subscriber/**/*.ts
```