# Project-OnlineJudge

# ALGO_ACE-ONLINE JUDGE
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/frontend/src/logo.png" marginLeft="100" height="500" width="500" />

## Table of Contents

  1. Overview
  2. Features
  3. Technologies Used
  4. Prerequisites                                              
  5. Installation
  6. Backend
  7. Frontend
  8. Environment Variables
  9. Usage
  10. Contributing





### OVERVIEW

This is a full-stack online judge platform built with the MERN stack (MongoDB, Express, React, Node.js). The platform allows users to solve coding problems, submit solutions, and view results. It includes features such as user authentication, problem management, code compilation, and execution in an isolated environment .

### Features
1. User authentication with JWT.
2. Problem management (creation, editing, and deletion).
3. Code compilation and execution using a custom compiler.

### Technologies Used

#### Frontend: React, Axios
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/imagesMERN.png" width="150" height="150" />

#### Backend: Node.js, Express, MongoDB, Mongoose
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/MERN3.png" height="150" width="200"/>
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/MERN2.png" height="150" width="200"/>
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/MERN%24.png" height="150" width="150"/>

#### Compiler: Node.js, Docker
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/docker.png" height="150" width="150" />

#### Authentication: JWT (JSON Web Token)
<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/jwt.png" height="150" width="250"/>


### Prerequisites
1. Node.js and npm installed on your machine
2. Docker and Docker Compose installed
3. MongoDB Atlas account

## Installation

### Backend
#### Clone the repository:

```git
git clone https://github.com/HemantGupta04/Project-OnlineJudge.git
cd OnlineJudge/backend
```
#### Install dependencies:

```git
npm install
```

### Frontend
#### Setup frontend
```git
cd OnlineJudge/frontend
```
 #### Install dependencies:
 ```git
npm install
```

## Environment Variables
### Create a .env file in the root of each repository (backend and compiler) and add the following variables:

#### Backend
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
```
#### Compiler
```
REACT_APP_BACKEND_URL=backend_url
```
## Running the Project
### Local Development
#### Backend
##### Start the backend server:

```git
nodemon index.js
```


#### Frontend
##### Start the frontend server

```git
npm start
```

## Docker Compose 
### Create a docker compose file outside your backend,compiler and frontend folders

```javascript
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - backend_port:backend_port  //port mapping
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=your_mongo_uri

  compiler:
build: ./compiler
    ports:
      - compiler_port:compiler_port  //port mapping
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=your_mongo_uri
  mongodb:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

```
## Docker Deployment
### Start all servers with a single docker compose command
```git
Docker-compose up -d
```

## Usage


### 1. User Registration and Login: Users can register and log in to the platform.


<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/home.png" height="300px" width="550"/>


<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/register.png" height="300px" width="550"/>

<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/login.png" height="300px" width="550"/>


### 2. Problem Management: users can create, view, edit, and delete problems.


<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/result.png" height="300px" width="550"/>


### 3. Code Submission: Users can submit their code for problems, which will be compiled and executed.


<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/compiler.png"  height="300px" width="550"/>


### 4. Submit your code for problems and get them judged.


<img src="https://github.com/HemantGupta04/Project-OnlineJudge/blob/main/result.png" height="300px" width="550"/>


 
## Contributing
We welcome contributions from the community to enhance the Online Judge Platform. If you have ideas for new features, improvements, or bug fixes, follow these steps to contribute

1. Fork the Repository: Click the 'Fork' button at the top right of this repository to create your own copy.
2. Clone the Forked Repository: Clone your forked repository to your local machine using
```git
```
3.git clone https://github.com/HemantGupta04/Project-OnlineJudge.git
```git
git checkout -b branch_name
```
4. Make Changes: Implement your changes in the codebase.
5. Commit Your Changes: Commit your changes with a clear and descriptive commit message
```git
git commit -m "Add feature: your feature name"
```
6. Push to Your Fork: Push your changes to your forked repository
```git
 git push origin feature/your-feature-name
```
7. Submit a Pull Request: Open a pull request to the main repository with a description of your changes. Make sure to follow the pull request template provided

#### Before contributing, please ensure that your changes follow the project's coding standards and guidelines.
#### Thank you for your interest in contributing to the Online Judge Platform! 
