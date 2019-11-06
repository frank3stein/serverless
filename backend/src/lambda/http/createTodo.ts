import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import * as uuid from 'uuid';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem';
import { getUserId } from '../utils';
import {createTodo} from '../businessLogic/logic';
const bucketName = process.env.IMAGES_S3_BUCKET;


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
    attachmentUrl: `https://${bucketName}.s3.amazonaws.com/${todoId}.png`
  }

  const todoDB = await createTodo(todoItem);
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(todoDB)
  }
}