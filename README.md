
# School Management System

## Overview

This School Management System provides APIs for managing and interacting with school data. It utilizes Node.js and Express.js for the backend, with MySQL hosted on Railway for database management. The Node.js backend is deployed on Render, ensuring reliable performance and accessibility.


### Endpoint
### 1. Add School
- **Endpoint**: `/addSchool`
- **Method**: `POST`
- **Description**: Adds a new school to the database.
- **Request Body**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }

- **Responses:**

    - **201 Created**: School added successfully.
    - **400 Bad Request**: Missing or invalid fields.
    - **500 Internal Server Error**: Error while processing the request.

### 2. List Schools
- **Endpoint**: `/listSchools`
- **Method**: `GET`
- **Description**: Retrieves all schools from the database and sorts them based on proximity to the user's location.
- **Query Parameters**:
    - **lat**: User's latitude.
    - **lng**:User's longitude.

- **Responses:**

    - **200 OK**: List of schools sorted by distance from the user.
    - **400 Bad Request**: Missing or invalid latitude/longitude.
    - **500 Internal Server Error**: Error while retrieving data..











