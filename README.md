# A polling app with authentication

Steps to run this application

- run `npm i`
- Setup database settings inside `src/ormconfig.json` 
    - the specified database name has to be an exisiting database
- create a `.env` file and add `JWT_SECRET=your_secret_key` to it
- run `npm run dev` to create tables 
- run `npm run dummy-data` to create dummy data in the tables
- run `npm run dev` again to start the project

---
# Overview
I made this project to learn to make a web application that uses authentication and a database for persistent storage.

## Backend
I used express.js to make an api, type-orm for database management and jsonwebtoken for authentication. Everything was written in typescript.

## Frontend
I chose to learn React with this project. I used react-dom-router for routing and react-redux for an app-wide store to make state management and authentication easier. 



---
My css skills could use some work...

Some things are still unimplemented.

Like deleting polls, viewing your own polls seperately, searching for polls and jwts expiring.
