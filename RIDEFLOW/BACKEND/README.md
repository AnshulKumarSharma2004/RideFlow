# Users API — Register Endpoint

## Endpoint
- **URL:** `/users/register`
- **Method:** `POST`

## Description
Register a new user. The endpoint expects a JSON body containing the user's full name (first and optional last name), email and password. On success it returns a newly created user object and an authentication token.

## Request Headers
- `Content-Type: application/json`

## Request Body (JSON)
Required fields:
- `fullname.firstname` (string) — required, minimum length 3
- `email` (string) — required, must be a valid email address
- `password` (string) — required, minimum length 6

Optional fields:
- `fullname.lastname` (string) — optional, minimum length 3 if provided

Example:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

## Validation Rules (server-side)
- `fullname.firstname` - must be at least 3 characters (validated with `express-validator`)
- `email` - must be a valid email
- `password` - must be at least 6 characters

## Responses
- **201 Created**
  - Description: User successfully created.
  - Body example:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<userId>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

- **400 Bad Request**
  - Description: Validation failed (missing/invalid fields).
  - Body example:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **409 Conflict** (possible)
  - Description: Email already exists (unique index violation). The controller does not explicitly return 409 currently, but a conflict-like error may occur from the database.

- **500 Internal Server Error**
  - Description: Unexpected server/database error.

## Notes
- The route is mounted in the app at `/users`, so the full path is `/users/register` as shown above.
- The password is stored hashed (handled by the model/service). The returned `user` object excludes the password (the schema sets `select: false`).

---

If you want, I can add similar README entries for the other `/users` endpoints (login, profile, etc.).

## Endpoint
- **URL:** `/users/login`
- **Method:** `POST`

## Description
Authenticate an existing user. The endpoint expects a JSON body containing the user's email and password. On success it returns the user object and an authentication token.

## Request Headers
- `Content-Type: application/json`

## Request Body (JSON)
Required fields:
- `email` (string) — required, must be a valid email address
- `password` (string) — required, minimum length 6

Example:

```json
{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

## Validation Rules (server-side)
- `email` - must be a valid email
- `password` - must be at least 6 characters

## Responses
- **200 OK**
  - Description: User successfully authenticated.
  - Body example:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<userId>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

- **400 Bad Request**
  - Description: Validation failed (missing/invalid fields).
  - Body example:

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**
  - Description: Invalid email or password.
  - Body example:

```json
{
  "message": "Invalid email or password"
}
```

- **500 Internal Server Error**
  - Description: Unexpected server/database error.

## Notes
- The route is mounted in the app at `/users`, so the full path is `/users/login` as shown above.
- The password is compared against the hashed version in the database. The returned `user` object excludes the password (the schema sets `select: false`).
