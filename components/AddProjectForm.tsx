
import React, { useState } from 'react';
import PlusIcon from './icons/PlusIcon';

interface AddProjectFormProps {
  onAddProject: (name: string) => void;
}

const AddProjectForm: React.FC<AddProjectFormProps> = ({ onAddProject }) => {
  const [projectName, setProjectName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onAddProject(projectName.trim());
      setProjectName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 max-w-lg mx-auto">
      <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg shadow-lg">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter a new project name..."
          className="flex-grow bg-transparent text-white placeholder-slate-500 focus:outline-none px-2 py-1"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!projectName.trim()}
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
