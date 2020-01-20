import "source-map-support/register";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getUserIdExpress } from "../utils";
import { getAllTodos } from "../businessLogic/logic";
import * as express from "express";
import serverless from "serverless-http";

const app = express();

app.get("/todos", async (req, res) => {
  console.log("Request log", req);
  const userId = getUserIdExpress(req);
  console.log(userId);
  const todos = await getAllTodos(userId);

  res
    .set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    })
    .status(200)
    .send(
      JSON.stringify({
        todos
      })
    );
});

// in order to pass the event and context
const handler = serverless(app);
exports.handler = (event: APIGatewayProxyEvent, context) => {
  //@ts-ignore -- source will be added by the warmup plugin
  if (event.source === "serverless-plugin-warmup") {
    return "This function is hot !";
  }
  return handler(event, context);
};

// if you do not need to pass the event or context
// exports.handler = serverless(app);

// I left the implementation without express. I used express getTodos as express-aws learning opportunity and leave out the rest of the functions as they are.
// export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
// TODO: Get all TODO items for a current user
// const userId = getUserId(event);
// console.log(userId)
// const todos = await getAllTodos(userId);

// return {
//   statusCode: 200,
//   headers:{
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Credentials': true
//   },
//   body: JSON.stringify({
//     todos
//   })
// }
// }
