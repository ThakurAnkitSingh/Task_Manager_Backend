### Task Manager Backend Project

## Project Overview

The Task Manager Backend is a robust and scalable API designed to facilitate task management functionalities for users. Built with Node.js and Express, this project provides a RESTful interface for managing tasks, user authentication, and profiles. It serves as the backbone of a task management application, allowing users to create, update, delete, and organize their tasks efficiently.

## Key Features

  User Authentication: Secure authentication is implemented using JSON Web Tokens (JWT) to ensure that user data is protected. Users can sign up, log in, and access their task lists with a secure token-based system.
  
  Task Management: Users can create, read, update, and delete tasks, which are categorized by their status (e.g., To Do, In Progress, Completed). The API supports retrieving tasks based on different filters and sorting criteria.
  
  Role-Based Access Control: This feature ensures that users can only access their tasks while protecting the application from unauthorized access.

## Prerequisites

  Node.js (v14 or higher)
	
  MySQL (Ensure you have a running MySQL instance)
	
  Firebase Admin SDK configuration file (firebaseadmin.json)



### Getting Started

## 1. Clone the repository
   
  git clone <repository_url>
	
  cd task_manager_backend

## 2. Install dependencies
   
  npm install

## 3. Set up environment variables
   
### Create a .env file in the root directory:

  PORT=5000
  
  DB_HOST=your_mysql_host

  DB_USER=your_mysql_user

  DB_PASSWORD=your_mysql_password
  
  DB_NAME=your_database_name
  
  JWT_SECRET=your_jwt_secret_key
  
  FIREBASE_CONFIG=./firebaseadmin.json
  


## 4. Configure Database
   
  Make sure your MySQL server is running.
	
  Create a database with the name specified in DB_NAME.
	
  
### Run migrations using Knex.js (if applicable):
	
npx knex migrate:latest


## 5. Start the server
   
  npm start. npx nodemon src/app.js

### API Documentation

  Authentication: /api/auth
	
  Tasks: /api/tasks
	
  Users: /api/users
	

## For detailed API documentation, 

refer to docs/api_documentation.md (if you have an API documentation file).

## Technologies Used
  Node.js, Express, JavaScript, Rest APIs, MVC Architecture
  
  MySQL with Knex.js
  
  Firebase Authentication (Google Login)
  
  JWT for authentication
