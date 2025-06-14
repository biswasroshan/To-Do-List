import { Todo } from '../types/todo';

const TODO_STORAGE_KEY = 'react-todo-list';

export const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(TODO_STORAGE_KEY);
    if (!stored) return [];
    
    const todos = JSON.parse(stored);
    return todos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt),
    }));
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return [];
  }
};

export const saveTodos = (todos: Todo[]): void => {
  try {
    const todosToSave = todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt.toISOString(),
    }));
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todosToSave));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
  }
};

export const clearTodos = (): void => {
  try {
    localStorage.removeItem(TODO_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear todos from localStorage:', error);
  }
};