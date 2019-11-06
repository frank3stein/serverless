import {TodoAccess} from '../dataLayer/todoAccess';
import { TodoItem } from '../../models/TodoItem';

const todoAccess = new TodoAccess();

export async function getAllTodos(userId:string):Promise<TodoItem[]>{
    return todoAccess.getAllTodos(userId);
}

export async function createTodo(todoItem:TodoItem):Promise<TodoItem>{
    return todoAccess.createTodo(todoItem);
}

export async function deleteTodo({userId, todoId}, params):Promise<void>{
    todoAccess.deleteTodo({userId,todoId }, params);
}

export async function updateTodo({userId, todoId, updatedTodo}){
    todoAccess.updateTodo({userId, todoId, updatedTodo});
}

export async function generateUploadUrl(todoId:string):Promise<String>{
    return todoAccess.generateUploadUrl(todoId);
}