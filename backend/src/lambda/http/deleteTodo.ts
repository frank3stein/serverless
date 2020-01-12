import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import {deleteTodo} from '../businessLogic/logic';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  //@ts-ignore -- source will be added by the warmup plugin
  if(event.source === 'serverless-plugin-warmup'){
    //@ts-ignore
    return 'This function is hot !'
  }
  const { todoId } = event.pathParameters;
  const userId = getUserId(event);
  const params = {
    Bucket: process.env.IMAGES_S3_BUCKET,
    Key: todoId 
  }
  await deleteTodo({userId, todoId}, params)
  
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: `${todoId} is deleted`
  }
}
