the application is not hosted anywhere, so to run on you localhost do the following:

1) npm i

2) download pgadmin4

3) create database named "todo" 

4) crteate table using this sql syntax:
 CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description TEXT NOT NULL
);

run the server application on port 3000 and the run npm start on 3001
