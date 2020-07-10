# task-manager-api

A task manager REST API built in Node as part of @andrewjmead 's Node.JS course "The Complete Node.js Developer Course"

The API makes use of MongoDB, mongoose, express, sendgrid, bcryptjs, jsonwebtoken, multer, sharp and validator in production.
In development it makes use of the above along with env-cmd, jest and supertest.

#Environment Variables

Setup your environment variables in a "config" folder in the base directory of the project.
The necessary variables are : PORT, SENDGRID_API_KEY, JWT_SECRET and MONGOOSE_URL
