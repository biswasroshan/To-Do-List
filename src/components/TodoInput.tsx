import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';

interface TodoInputProps {
  onAddTodo: (text: string, priority: 'low' | 'medium' | 'high') => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedText = text.trim();
    
    if (!trimmedText) {
      setError('Task cannot be empty');
      return;
    }
    
    if (trimmedText.length < 3) {
      setError('Task must be at least 3 characters long');
      return;
    }
    
    if (trimmedText.length > 100) {
      setError('Task cannot exceed 100 characters');
      return;
    }
    
    onAddTodo(trimmedText, priority);
    setText('');
    setError('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (error) setError('');
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={text}
              onChange={handleTextChange}
              placeholder="Add a new task..."
              className="w-full px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
              maxLength={100}
            />
            <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
              <span>{text.length}/100 characters</span>
              {error && (
                <div className="flex items-center gap-1 text-red-500 animate-fade-in">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="px-4 py-3 bg-white/80 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              disabled={!text.trim()}
            >
              <Plus size={20} />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
        
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((p) => (
            <div
              key={p}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                priority === p ? 'bg-white/20 text-white' : 'text-gray-400'
              } cursor-pointer transition-all duration-200 hover:bg-white/10`}
              onClick={() => setPriority(p)}
            >
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(p)}`} />
              <span className="capitalize">{p}</span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};