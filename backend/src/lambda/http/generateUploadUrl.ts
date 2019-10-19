import 'source-map-support/register'
import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

const s3 = new AWS.S3({
  signatureVersion:'v4'
})

const bucketName = process.env.IMAGES_S3_BUCKET;
const urlExpiration = process.env.SIGNED_URL_EXPIRATION;

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { todoId } = event.pathParameters;

  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  try {
    const url = await getUploadUrl(todoId);
  
    return {
      statusCode: 200,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  } catch(err){
    console.log(err)
    return {
      statusCode: 400,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: `Could not get the url. Error: ${err}`
    }
  }

  function getUploadUrl(todoId: string):Promise<String>{
    return new Promise((res, rej)=>{
      s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: todoId+'.png',
        Expires: Number(urlExpiration), // expiration must be a number
        ContentType:'image/png'
      }, (err, signedUrl)=> {
        if (err) {
          console.log('getSignedUrl failed ', err)
          rej(err);
        }
        res(signedUrl);
        return signedUrl;
      })
    });
  }
}
