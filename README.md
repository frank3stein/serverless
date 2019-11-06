# Serverless TODO

The frontend is using React to render the view.

The backend is fully serverless running on AWS Lambda.

# Functionality of the application

The user can log in using their google login. More options can be added using the service Auth0. Frontend gets their todos from DynamoDB database by querying for the user id and their todos are viewed in their home page. The primary key here is the user id and the sort key is todo id. The fetch of items for the same user needs to be very fast and that is the reason I chose user id but not the todo id as my primary key.

The user can create, edit, delete todos. The requests are validated in the API GATEWAY using schemas. So only valid requests hit the lambda functions.

The user can also add image to each todo. To grant access to S3 upload I have used presignedurl's so the user is given one time expiring access to todoid.png local in S3 bucket with each upload post request.


## The functions 
- Auth - The auth function runs to make sure the user has is authorized to run the lambda function. This is configured through serverless framework via the serverless.yml.
- GetTodos - Fetches all todos for the user, using their user id from the auth token.
- CreateTodo - Creates a todo item in the DynamoDB database.
- UpdateTodo - Updates the todo item fields in the DynamodDB database.
- DeleteTodo - Deletes the todo item in the DynamoDB databse.
- GenerateUploadUrl - Generates a presigned url for user to upload to s3 bucket destination. This function has the privildge to upload to s3, so it can grant that priviledge to the user for a limited time.

## Run the project locally
Run `git clone https://github.com/frank3stein/serverless.git`
Then npm start at /client
It will start running at port 3000. 

If you can not login make sure that in
`client/src/config.ts`
authConfig.callbackUrl points to `http://localhost:3000/callback`.