import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as uuid from 'uuid';
// import * as AWS from 'aws-sdk';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoItem } from '../../models/TodoItem';
import { getUserId } from '../utils';

const bucketName = process.env.IMAGES_S3_BUCKET;
const docClient = new DocumentClient();
// TODO: environment variable for the todosTable
const todosTable = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event);
  const userId = getUserId(event);
  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  const todoId = uuid.v4();
  const createdAt = new Date().toISOString();
  const todoItem: TodoItem = {
    userId,
    todoId,
    createdAt,
    ...newTodo,
    done: false,
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}`
  }

  await docClient.put({
    TableName: todosTable,
    Item: todoItem
  }).promise();
  // TODO: Implement creating a new TODO item
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}