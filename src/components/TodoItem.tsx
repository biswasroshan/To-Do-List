import React, { useState } from 'react';
import { Check, X, Calendar, Flag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    const color = priority === 'high' ? 'text-red-500' : 
                  priority === 'medium' ? 'text-yellow-500' : 'text-green-500';
    return <Flag size={16} className={color} />;
  };

  const formatDate = (date: Date) => {
    // Ensure we have a valid Date object
    const validDate = date instanceof Date ? date : new Date(date);
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(validDate);
  };

  return (
    <div
      className={`group bg-white/90 backdrop-blur-sm rounded-xl p-4 border-l-4 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in ${
        getPriorityColor(todo.priority)
      } ${isDeleting ? 'animate-slide-out' : ''} ${
        todo.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
            todo.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          {todo.completed && <Check size={16} />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getPriorityIcon(todo.priority)}
            <span className="text-xs text-gray-500 uppercase font-medium">
              {todo.priority} priority
            </span>
          </div>
          <p
            className={`text-gray-800 transition-all duration-200 ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'group-hover:text-gray-900'
            }`}
          >
            {todo.text}
          </p>
          <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
            <Calendar size={12} />
            <span>{formatDate(todo.createdAt)}</span>
          </div>
        </div>

        <button
          onClick={handleDelete}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};