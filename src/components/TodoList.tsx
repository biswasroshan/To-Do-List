import React from 'react';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';
import { Todo, FilterType, SortType } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  sort: SortType;
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  filter,
  sort,
  onToggleTodo,
  onDeleteTodo,
}) => {
  // Filter todos based on the selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  // Sort the filtered todos based on the selected sort option
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sort) {
      case 'alphabetical':
        return a.text.toLowerCase().localeCompare(b.text.toLowerCase());
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        // If priorities are the same, sort by date (newest first)
        if (priorityDiff === 0) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return priorityDiff;
      case 'date':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <Sparkles size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No tasks yet</h3>
          <p className="text-gray-300">Add your first task to get started!</p>
        </div>
      </div>
    );
  }

  if (sortedTodos.length === 0) {
    const getEmptyMessage = () => {
      switch (filter) {
        case 'active':
          return {
            icon: <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />,
            title: "All tasks completed!",
            message: "Great job! You've completed all your tasks."
          };
        case 'completed':
          return {
            icon: <Circle size={48} className="mx-auto text-gray-400 mb-4" />,
            title: "No completed tasks",
            message: "Complete some tasks to see them here."
          };
        default:
          return {
            icon: <Sparkles size={48} className="mx-auto text-gray-400 mb-4" />,
            title: "No tasks found",
            message: "Try adjusting your filters."
          };
      }
    };

    const { icon, title, message } = getEmptyMessage();

    return (
      <div className="text-center py-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          {icon}
          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
          <p className="text-gray-300">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};