
# Nursery Management System

This is a small nursery management system built with Node.js, Express.js, and MongoDB. It provides endpoints for managing teachers, children, and classes.

## Features

- CRUD operations for teachers
- CRUD operations for children
- CRUD operations for classes
- Authentication with JWT tokens
- Input validation for creating and updating resources
- File upload for teacher images

## Installation

1. Clone the repository:

```bash
git clone https://github.com/asmaa-elfatayry/Nursery-App
```

2. Install dependencies:

```bash
cd nursery-management-system
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Define the following variables:
     - `PORT`: Port number for the server (default is 3000)
     - `MONGODB_URI`: MongoDB connection URI
     - `JWT_SECRET`: Secret key for JWT token generation

4. Run the application:

```bash
npm start
```

## Main Endpoints

### Teachers

- `GET /teachers`: Get all teachers
- `POST /teachers`: Add a new teacher 
- `PUT /teachers`: Update an existing teacher 
- `DELETE /teachers`: Delete a teacher 
- `PUT /teachers/password`: Change the teacher's password 

### Children

- `GET /childrens`: Get all children
- `POST /childrens`: Add a new child (Authorization required)
- `PUT /childrens`: Update an existing child (Authorization required)
- `DELETE /childrens`: Delete a child (Authorization required)

### Classes

- `GET /classes`: Get all classes
- `POST /classes`: Add a new class 
- `PUT /classes`: Update an existing class 
- `DELETE /classes`: Delete a class 

## Authentication

- Authentication is required for most endpoints using JWT tokens.
- To authenticate, include the JWT token in the Authorization header of the request.
- Use the `/login` endpoint to obtain a JWT token by providing valid credentials.

## Note

- Swagger documentation is not accessible directly as most routes require authorization with a JWT token.


