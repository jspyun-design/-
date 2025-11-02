
import React from 'react';
import { Task, TaskStatus } from '../types';
import { TASK_STATUS_OPTIONS, TASK_STATUS_COLORS } from '../constants';
import TrashIcon from './icons/TrashIcon';
import CalendarIcon from './icons/CalendarIcon';

interface TaskItemProps {
  task: Task;
  onUpdateStatus: (newStatus: TaskStatus) => void;
  onDelete: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
  const statusColors = TASK_STATUS_COLORS[task.status];

  return (
    <div className="flex items-center justify-between bg-slate-800 p-3 rounded-lg my-2 transition-all hover:bg-slate-700/50">
      <div className="flex-1">
        <p className="text-slate-100">{task.description}</p>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
          <CalendarIcon className="w-4 h-4" />
          <span>Due: {task.dueDate}</span>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <div className="relative">
          <select
            value={task.status}
            onChange={(e) => onUpdateStatus(e.target.value as TaskStatus)}
            className={`appearance-none text-xs font-semibold rounded-full px-3 py-1 focus:outline-none focus:ring-2 ${statusColors.bg} ${statusColors.text} ${statusColors.ring}`}
          >
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onDelete}
          className="text-slate-500 hover:text-red-500 transition-colors"
          aria-label="Delete task"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
