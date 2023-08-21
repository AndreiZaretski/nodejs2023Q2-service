# Home Library Service Part 3

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/AndreiZaretski/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Starting application with Docker

Install the desktop version of docker and run it on your computer

[Docker desktop](https://docs.docker.com/engine/install/)

Run the following command in terminal

```
docker-compose up
```

## Stopping application with Docker

Run the following command in terminal

```
docker-compose down
```

## For check refresh token 

1 Create new user in postman this route http://localhost:4000/auth/signup, method POST and
body 

```
{
  "login": "Login",
  "password": "Password"
}
```

2 Login in postman this route http://localhost:4000/auth/login method POST and body 

```
{
  "login": "Login",
  "password": "Password"
}
```

3 Copy refresh token from response and paste it in body for route http://localhost:4000/auth/refresh Method Post

```
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyNTkwYTg4NC05ZDIxLTQwODItOWUxZi05YmRkMWU5ZmU5YWIiLCJ1c2VybmFtZSI6InN0cmluZ2VyIiwiaWF0IjoxNjkyNTY5MTE4LCJleHAiOjE2OTI2NTU1MTh9.ASw21eJBZIHfpH-bJ3UXtNi0l7BvOz3HS4DnlLQsOe8"
}
```

4 Send request

## Check env variable for LOG_LEVEL and LOG_FILE_SIZE

you can see console 

![Console env file](image.png)

or write your variable in env file and delete image, container in docker and rebuild them

## LOG_LEVEL

Number for level

0- use only error

1 - use error, warn

2 - use error, warn, log

3- use error, warn, log, debug

4 - use error, warn, log, debug, verbose

if you write wrong number - will be write error, warn, log

## Write logs in file

logs and errors write in diferrent files. You can see this in folder logs in docker or this project

## For check listener and logging to uncaughtException and unhandledRejection event

Uncomment the signed code in main.ts file

## Scan vulnerabilities images

Run the following command in terminal

```
npm run scan
```

## For clean clean docker cache run the next commands in terminal

```
docker builder prune  
```
  or

```
docker system prune

```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Important

```
npm run test doesn't work in this task
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
