import * as AWS from 'aws-sdk';
import * as AWSXray from 'aws-xray-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoItem } from '../../models/TodoItem';
import {TodoUpdate} from '../../models/TodoUpdate';

const XAWS = AWSXray.captureAWS(AWS);

export class TodoAccess {
    constructor(
        //@ts-ignore
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly s3 = new XAWS.S3(),
        private readonly bucketName = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
    ){}
    async getAllTodos(userId:string): Promise<TodoItem[]>{
        console.log('Getting all Todos');
        
        const result = await this.docClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: '#userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            },
            ExpressionAttributeNames:{
              '#userId':'userId' // Best Practice: to make sure there are no conflicts with reserved words
            }
          }).promise();

          const items = result.Items;
          return items as TodoItem[];
    }
    
    async createTodo(todoItem:TodoItem): Promise<TodoItem> {
        console.log(`Create a todo with id ${todoItem.todoId}`);
        await this.docClient.put({
            TableName: this.todosTable,
            Item: todoItem
          }).promise();
        return todoItem;
    }
    async deleteTodo({userId, todoId}:{userId:string; todoId:string;}, params):Promise<void> {
      try {
      console.log(params);
      await this.docClient.delete({
        TableName: this.todosTable,
        Key: {
          userId,
          todoId
        }
      }).promise()
        this.s3.getObject(params, (err, _)=>{
            if(err){
              console.log(err)
              return;
            }
            this.s3.deleteObject(params, (err, data)=>{
              if (err) console.log(err, err.stack);
              console.log('Deleting from s3 the picture: ', data);
            })
          })
        } catch(error){
          console.log(error);
        }
    }
    async updateTodo({userId, todoId, updatedTodo}:{userId:string; todoId:string; updatedTodo:TodoUpdate;}){
        await this.docClient.update({
            TableName: this.todosTable,
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
          }).promise();

    }
    async generateUploadUrl(toodId:string):Promise<String>{
        return this.getUploadUrl(toodId);
    }
    private getUploadUrl(todoId: string):Promise<String>{
        return new Promise((res, rej)=>{
          this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: todoId,
            Expires: Number(this.urlExpiration), // expiration must be a number
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

// export default (() => (new TodoAccess()))(); // Exporting the initiated constructor.