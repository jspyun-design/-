
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';
import CalendarIcon from './icons/CalendarIcon';

interface AddTaskFormProps {
  onAddTask: (description: string, dueDate: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim() && dueDate) {
      onAddTask(description.trim(), dueDate);
      setDescription('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row items-center gap-2">
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="New task description"
        className="w-full sm:flex-grow bg-slate-700 border border-slate-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="relative w-full sm:w-auto">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto flex justify-center items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!description.trim() || !dueDate}
      >
        <PlusIcon className="w-5 h-5" />
        <span>Add Task</span>
      </button>
    </form>
  );
};

export default AddTaskForm;
