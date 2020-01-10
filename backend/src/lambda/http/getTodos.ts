import 'source-map-support/register'
// import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserIdExpress } from '../utils';
import { getAllTodos } from '../businessLogic/logic';
import * as express from 'express';
import serverless from'serverless-http';

const app = express();

app.get('/todos', async(req, res)=>{
  console.log('Request log', req);
  const userId = getUserIdExpress(req);
  console.log(userId)
  const todos = await getAllTodos(userId);

  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true})
    .status(200)
    .send(
      JSON.stringify(
      {
        todos
      })
    );
})

exports.handler = serverless(app);
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
