# Task-Manager-api

* This API was built for training purpose.
* With Task-Manager-API you can create/delete/update user and the same for tasks.

## What i used:

* Express(for Restful API and manage routers).
* Mongoose(NoSql database tool for developement and testing).
* Mongodb Atlas(NoSql database tool for production) 
* heroku (deployment).

* validator(validating some data).
* Async-Await (for waitting until the process done!).
* promises(write a cleaner code, instead of callbacks mess).
* bcrypt (Hashing passwords)
* JWT(authentication layer).
* multer(image uploading).
* sharp(croping and image formatter).
* sendGrid/email.

* postman (testing)
* jest (Automated testing)


## Getting Started

#### Download npm Modules
```
npm install
```

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

and alot more you can find all routes at routers folder.
