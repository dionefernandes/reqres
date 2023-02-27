# Application that makes API requests at [REQRES](https://reqres.in)

The application makes HTTP requests to API [REQRES](https://reqres.in), which is a public testing API for developers.


## Installation

1. Make sure you have Node.js installed on your machine.
2. Download the application and open it in a code editor like Visual Studio Code
3. Access the editor console and access the project root directory
4. Run the command: npm install
5. In the root folder of the project there is a file called 'API.postman_collection.json'. Import this file into your Postman to be able to execute HTTP requests.
6. After finishing the installation of the 'node_modules' folder, in the code editor console, start the application by executing the command: npm run start
7. If you want to add breakpoints to the application, start it with: npm run start:dev

### Note

1. The application will run on port 3000 (http://localhost:3000). If you wish, you can define a new port in 'src/main.ts', in the root of the project.
2. Use MongoDB Compass to view the database. The path to the database can be changed in the 'app.module.ts' file in 'src/app.module.ts', in the root of the project.


## Application usage

Once the application is started, we can use Postman to execute the requests. The project has 4 endpoints with the following features:

### @Post('/users')

This request makes a call to API [REQRES](https://reqres.in) using the Axios library. The API, in turn, returns a list of users with their respective data. User data is stored in a non-relational database, which is MongoDB. The user's avatar is also stored in base 64 in the database and a file with the user's avatar is created in the 'Assets/AvatarImg' directory, in the root of the project.

### @Get('/users/:id')

In this case, a request is made to the API [REQRES](https://reqres.in) informing the id of a user. The API in response returns the requested user data. Returned data can be viewed in Postman

### @Get('/users/:id/avatar')

This request queries the database passing a user id. User data is returned, including base 64 avatar. Data can be viewed in Postman

### @Delete('/users/:id/avatar')

This request deletes a user from the database using the entered id as a criterion. The file with the user's avatar that had been created in the 'Assets/AvatarImg' directory, at the root of the project, is also deleted.


## Test

The unit tests of the application were placed in the 'test' directory, at the root of the project. The command to run the unit tests is: npm run test


## Support

Email: dionefernandes@gmail.com
Telegram: @dioneRfernandes