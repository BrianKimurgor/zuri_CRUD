# zuri_CRUD
# API Documentation

Welcome to the API documentation for the "Person" resource. This REST API provides basic CRUD (Create, Read, Update, Delete) operations for managing person records in a MongoDB database. Below, you'll find detailed information on how to use this API effectively.

## Table of Contents

1. [Base URL](#base-url)
2. [Authentication](#authentication)
3. [Endpoints](#endpoints)
   - [Create a New Person](#create-a-new-person)
   - [Retrieve Details of a Person](#retrieve-details-of-a-person)
   - [Modify Details of an Existing Person](#modify-details-of-an-existing-person)
   - [Remove a Person](#remove-a-person)
4. [Response Formats](#response-formats)
5. [Error Handling](#error-handling)

---

## Base URL

The base URL for this API is:

```
http://localhost:3000
```

Replace `localhost:3000` with the appropriate host and port where your server is running.

## Authentication

This API does not require authentication for the provided endpoints. Ensure that your server is running and accessible to make requests.

## Endpoints

### Create a New Person

**Endpoint:** `POST /api/person`

Create a new person record by sending a JSON request body with the following properties:

- `name` (String, required): The name of the person.
- `age` (Number, required): The age of the person.
- `email` (String, required, unique): The email address of the person.

#### Request Example

```json
POST http://localhost:3000/api/person
Content-Type: application/json

{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}
```

#### Response Example

```json
{
  "_id": "603e964e292de740bc6e848a",
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "__v": 0
}
```

### Retrieve Details of a Person

**Endpoint:** `GET /api/person/:id`

Retrieve details of a person by providing the `id` parameter in the URL.

#### Request Example

```json
GET http://localhost:3000/api/person/603e964e292de740bc6e848a
```

#### Response Example (Person Found)

```json
{
  "_id": "603e964e292de740bc6e848a",
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "__v": 0
}
```

#### Response Example (Person Not Found)

```json
{
  "error": "Person not found"
}
```

### Modify Details of an Existing Person

**Endpoint:** `PUT /api/person/:id`

Modify the details of an existing person by providing the `id` parameter in the URL and sending a JSON request body with the updated properties.

#### Request Example

```json
PUT http://localhost:3000/api/person/603e964e292de740bc6e848a
Content-Type: application/json

{
  "name": "Updated Name",
  "age": 35,
  "email": "updated@example.com"
}
```

#### Response Example (Person Updated)

```json
{
  "_id": "603e964e292de740bc6e848a",
  "name": "Updated Name",
  "age": 35,
  "email": "updated@example.com",
  "__v": 0
}
```

#### Response Example (Person Not Found)

```json
{
  "error": "Person not found"
}
```

### Remove a Person

**Endpoint:** `DELETE /api/person/:id`

Remove a person by providing the `id` parameter in the URL.

#### Request Example

```json
DELETE http://localhost:3000/api/person/603e964e292de740bc6e848a
```

#### Response Example (Person Removed Successfully)

```json
{
  "message": "Person removed successfully"
}
```

#### Response Example (Person Not Found)

```json
{
  "error": "Person not found"
}
```

## Response Formats

- Successful responses return a JSON object containing the relevant person data.
- Error responses return a JSON object with an `error` message.

## Error Handling

- The API provides appropriate error messages when a person is not found or when there are validation errors (e.g., missing or invalid fields in the request body).
- Ensure you handle and display error responses accordingly in your application.

That's it! You now have the necessary information to interact with the "Person" resource API effectively. If you encounter any issues or have questions, please refer to the provided documentation or contact our support team for assistance.
