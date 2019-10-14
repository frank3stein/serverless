import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as AWS from 'aws-sdk';

var docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  try{

    await docClient.update({
      TableName: todosTable,
      Key: {
        "id":todoId
      },
      UpdateExpression: 'set name = :n, dueDate = :due, done = :d',
      ExpressionAttributeValues:{
        ':n': updatedTodo.name,
        ':due': updatedTodo.dueDate,
        ':d':updatedTodo.done
      }
    }).promise()
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    return {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: ''
    }
  } catch (err){
    throw new Error('Could not update')
  }
}
