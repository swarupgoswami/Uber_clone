# API Documentation

## Endpoint: `/user/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A string that must be a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}


### Response (Success):
The response will be a JSON object containing the following fields:

- `message`: A string indicating the success of the registration.
- `token`: A JSON Web Token (JWT) for authentication.
- `user`: An object containing the registered user's data:
    - `id`: The unique identifier of the user.
    - `fullname`: An object containing:
        - `firstname`: The user's first name.
        - `lastname`: The user's last name.
    - `email`: The user's email address.

Example:
```json
{
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "1234567890",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

Client Error (400 Bad Request):
Description: Validation errors or missing required fields.
Body:
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}

Example Request:
curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'

Example Response:
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}


Status Codes:
201: User registered successfully.
400: Validation errors or missing required fields.



# API Documentation

## Endpoint: `/user/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

### Request Body:
The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname`: A string with a minimum length of 3 characters (required).
  - `lastname`: A string with a minimum length of 3 characters (optional).
- `email`: A string that must be a valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}


Responses:
Success (201 Created):
Description: User registered successfully.
Body:


{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}


Client Error (400 Bad Request):
Description: Validation errors or missing required fields.
Body:


{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}

Example Request:


curl -X POST http://localhost:3000/user/register \
-H "Content-Type: application/json" \
-d '{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}'


Example Response:
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}



Status Codes:
201: User registered successfully.
400: Validation errors or missing required fields.
Endpoint: /user/login
Method: POST
Description:
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user data.

Request Body:
The request body should be a JSON object with the following fields:

email: A string that must be a valid email address (required).
password: A string with a minimum length of 6 characters (required).
Example:

{
  "email": "john.doe@example.com",
  "password": "password123"
}
responses:
Success (200 OK):
Description: User logged in successfully.
Body:
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}
Client Error (400 Bad Request):
Description: Validation errors or missing required fields.
Body:
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}

Unauthorized (401 Unauthorized):
Description: Invalid email or password.
Body

{
  "message": "invalid email or password"
}

Example Request:
curl -X POST http://localhost:3000/user/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "password": "password123"
}'

Example Response:
{
  "token": "JWT_TOKEN_HERE",
  "user": {
    "_id": "USER_ID_HERE",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "hashed_password",
    "socketId": null
  }
}

Status Codes:
200: User logged in successfully.
400: Validation errors or missing required fields.
401: Invalid email or password.
