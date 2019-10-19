import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import * as AWS from 'aws-sdk';
import { getUserId } from '../utils'

const s3 = new AWS.S3({
  signatureVersion:'v4'
})
const docClient = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.TODOS_TABLE;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters;
  const userId = getUserId(event);
  const params = {
    Bucket: process.env.IMAGES_S3_BUCKET,
    Key: todoId+'.png' 
  }
  // delete the s3 image file if the image exists.
  s3.getObject(params, (err, _)=>{
    if(err){
      console.log(err)
    }
    s3.deleteObject(params, (err, data)=>{
      if (err) console.log(err, err.stack);
      console.log(data);
    })
  })

  
  await docClient.delete({
    TableName: tableName,
    Key: {
      userId,
      todoId
    }
  }).promise()
  
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}
