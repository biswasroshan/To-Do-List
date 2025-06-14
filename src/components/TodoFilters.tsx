import React from 'react';
import { Filter, SortAsc, Trash2 } from 'lucide-react';
import { FilterType, SortType } from '../types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  sort: SortType;
  onFilterChange: (filter: FilterType) => void;
  onSortChange: (sort: SortType) => void;
  onClearCompleted: () => void;
  completedCount: number;
  totalCount: number;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  onClearCompleted,
  completedCount,
  totalCount,
}) => {
  const activeCount = totalCount - completedCount;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-300" />
            <span className="text-white font-medium">Filter:</span>
          </div>
          <div className="flex gap-1">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => onFilterChange(f)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? 'bg-white text-gray-800 shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === 'active' && activeCount > 0 && (
                  <span className="ml-1 bg-blue-500 text-white text-xs px-1 rounded-full">
                    {activeCount}
                  </span>
                )}
                {f === 'completed' && completedCount > 0 && (
                  <span className="ml-1 bg-green-500 text-white text-xs px-1 rounded-full">
                    {completedCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <SortAsc size={20} className="text-gray-300" />
            <span className="text-white font-medium">Sort:</span>
          </div>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortType)}
            className="px-3 py-1 bg-white/20 text-white rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="date">Date Added</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="priority">Priority</option>
          </select>

          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 hover:text-red-200 transition-all duration-200 text-sm font-medium"
            >
              <Trash2 size={16} />
              Clear Completed
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/20">
        <div className="text-sm text-gray-300">
          <span className="font-medium">{totalCount}</span> total tasks • 
          <span className="font-medium text-blue-300 ml-1">{activeCount}</span> active • 
          <span className="font-medium text-green-300 ml-1">{completedCount}</span> completed
        </div>
        {totalCount > 0 && (
          <div className="mt-2">
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};