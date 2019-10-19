import 'source-map-support/register'
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils';
const docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);
  console.log(userId)

  const result = await docClient.query({
    TableName: todosTable,
    KeyConditionExpression: '#userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    },
    ExpressionAttributeNames:{
      '#userId':'userId' // To make sure there are no conflicts with reserved words
    }
  }).promise();

  const todos = result.Items;
  // If you return error for no todos, the spinner stays active.
  // if(result.Count === 0) {
  //   return {
  //     statusCode: 404,
  //     headers:{
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Credentials': true
  //     },
  //     body: 'The todos are empty'
  //   }
  // }
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      todos
    })
  }
}
