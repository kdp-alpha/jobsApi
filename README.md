# Job Listing Restful API
* This repository contains a Job Listing Restful API developed using Node.js and MongoDB. The API allows users to create accounts, authenticate using JSON Web Tokens (JWT), and manage job listings.
*   ## Features
*   User Registration: Users can create an account by providing their name, email, and password. The email is validated to ensure its correctness.

* User Authentication: JWT-based authentication is implemented for secure user login. Users receive a token upon successful authentication, which is required for accessing job listing-related functionalities.

* Job Creation: Authenticated users can create job listings by specifying the company name, job position, work type, and work location. Additional fields such as job status and the user who created the job are automatically generated and maintained.

* Job Management: Users can retrieve a list of all job listings, delete specific jobs by their unique IDs, and update job details using their respective IDs.

* ## Technologies Used
* Node.js
* MongoDB
* Express.js
* Mongoose
* JSON Web Tokens (JWT)
* Bcryptjs

*  ## Installation
*  Clone the repository:
*  Install the dependencies:
* Set up the environment variables:
  Create a .env file in the root directory and provide the following variables:
  * MONGODB_URI = `<your-mongodb-connection-uri>`
  * JWT_SECRET = `<your-jwt-secret>`
* Start the server: `npm run server`
  
* ## API Endpoints

* ### User Registration

- `POST /api/v1/auth/register`

- Registers a new user account.

- Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- `POST /api/v1/auth/login`
- Login The User

- Request Body:
``` json
{
  "email": "john@example.com",
  "password": "password123"
}
```

* ## Job Apis
- `POST /api/v1/job/create-jobs`
- Create a new jobs

- Request Body
   ```json
   {
     "company": "Acme Corporation",
     "position": "Software Engineer",
     "workType": "full-time",
     "workLocation": "Mumbai"
   }
  ```
- Get All Jobs
- `GET /api/v1/job/get-jobs`

* # Conclusion
* This Job Listing RESTful API provides essential functionalities for users to register, authenticate, and manage job listings. It leverages Node.js and MongoDB, along with Express.js and Mongoose, to deliver a robust and secure API. Feel free to explore the codebase and enhance it further based on your requirements.
