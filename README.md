# Task-Manager-api

* This API was built for training purpose.
* With Task-Manager-API you can create/delete/update user and the same for tasks.

## What i used:
<img align="left" alt="MongoDB" height="60px" src="https://raw.githubusercontent.com/Prithviraj2511/Task-Manager-API/main/Images/mongodb-226029.webp" />
<img align="left" alt="Node.js" height="60px" src="https://raw.githubusercontent.com/Prithviraj2511/Task-Manager-API/main/Images/nodejs.png" />
<img align="left" alt="Express" height="60px" src="https://raw.githubusercontent.com/Prithviraj2511/Task-Manager-API/main/Images/express.png" />
<img align="left" alt="Postman" height="60px" src="https://raw.githubusercontent.com/Prithviraj2511/Task-Manager-API/main/Images/postman.png" />
<img align="left" alt="jest" height="60px" src="https://raw.githubusercontent.com/Prithviraj2511/Task-Manager-API/main/Images/jest.png" /> 




* Express(for Restful API and manage routers).
* Mongoose(NoSql database tool for developement and testing).
* Mongodb Atlas(NoSql database tool for production). 
* heroku (deployment).
* validator(validating some data).
* Async-Await (for waitting until the process done!).
* promises(write a cleaner code, instead of callbacks mess).
* bcrypt (Hashing passwords).
* JWT(authentication layer).
* multer(image uploading).
* sharp(croping and image formatter).
* sendGrid/email.
* postman (testing).
* jest (Automated testing).


## Getting Started

#### Download npm Modules
```
npm install
```
#### Config
The application expects the following environment variables:

```
PORT
MONGODB_URL
JWT_SECRET
FROM_EMAIL
SENDGRID_API_KEY
```

The develompent, and test environment variables should be placed into the following files:
 * Development - `/config/dev.env`
 * Test - `/config/test.env`

#### Create User 

```
POST https://prithviraj-task-manager.herokuapp.com/users
```

#### Login User

```
POST https://prithviraj-task-manager.herokuapp.com/users/login
```
#### Logout User 

```
POST https://prithviraj-task-manager.herokuapp.com/users/logout
```
#### Create Task 

```
POST https://prithviraj-task-manager.herokuapp.com/tasks
```
#### Create Avatar

```
POST https://prithviraj-task-manager.herokuapp.com/users/me/avatar
```
#### User Profile

```
GET https://prithviraj-task-manager.herokuapp.com/users/me
```
#### Read Task 

```
GET https://prithviraj-task-manager.herokuapp.com/tasks
```

## Endpoints
All endpoints that accepts `POST` and `PATCH` request methods, expect `application/json` content type.

\* - Requires a valid JWT token as an HTTP request header (`Authorization: Bearer <jwt_token>`), which is sent from the authorization endpoints in the response body.

* Authorization
  * Create user                     - `POST /users`
  * Login user                      - `POST /users/login`
* User actions *
  * Logout user                     - `POST /users/logout`
  * Logout all users                - `POST /users/logout-all`
  * Read profile                    - `GET /users/me`
  * Update user                     - `PATCH /users/me`
  * Delete user                     - `DELETE /users/me`
  * Upload avatar                   - `POST /users/me/avatar`
  * Delete avatar                   - `DELETE /users/me/avatar`
  * Get user avatar                 - `GET /users/:id/avatar`
* Task management *
  * Create task                     - `POST /tasks`
  * Read tasks                      - `GET /tasks`
    * completed       - `Boolean`
    * sortBy          - `<field_name>:asc|desc`
    * limit           - `Number`
    * skip            - `Number`
  * Read task                       - `GET /tasks/:id`
  * Update task                     - `PATCH /tasks/:id`
  * Delete task                     - `DELETE /tasks/:id`

and alot more you can find all routes at routers folder.
