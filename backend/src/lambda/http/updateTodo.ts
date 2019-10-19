import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'

import * as AWS from 'aws-sdk';
import { getUserId } from '../utils';

var docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event);
  try{

    await docClient.update({
      TableName: todosTable,
      Key: {
        userId,
        todoId
      },
      ConditionExpression:`userId = :userId and todoId = :todoId`,
      UpdateExpression: 'set #name = :n, #dueDate = :due, #done = :d',
      ExpressionAttributeNames:{
        '#name':'name',
        '#dueDate': 'dueDate',
        '#done':'done'
      },
      ExpressionAttributeValues:{
        ':n': updatedTodo.name,
        ':due': updatedTodo.dueDate,
        ':d':updatedTodo.done,
        ':todoId':todoId,
        ':userId':userId
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
    console.log(err);
    return {
      statusCode: 400,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: `Error: ${err}`
    }
  }
}
