import { TodoAccess } from "../dataLayer/todoAccess";
import { TodoItem } from "../../models/TodoItem";

const todoAccess = new TodoAccess();

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return await todoAccess.getAllTodos(userId);
}

export async function createTodo(todoItem: TodoItem): Promise<TodoItem> {
  return await todoAccess.createTodo(todoItem);
}

export async function deleteTodo({ userId, todoId }, params): Promise<void> {
  await todoAccess.deleteTodo({ userId, todoId }, params);
}

export async function updateTodo({ userId, todoId, updatedTodo }) {
  await todoAccess.updateTodo({ userId, todoId, updatedTodo });
}

export async function generateUploadUrl(todoId: string): Promise<String> {
  return await todoAccess.generateUploadUrl(todoId);
}
