
import React, { useState, useMemo } from 'react';
import { Project, Task, TaskStatus } from '../types';
import ProgressBar from './ProgressBar';
import AddTaskForm from './AddTaskForm';
import TaskItem from './TaskItem';
import TrashIcon from './icons/TrashIcon';
import { suggestTasks } from '../services/geminiService';

interface ProjectCardProps {
  project: Project;
  onAddTask: (projectId: string, description: string, dueDate: string) => void;
  onUpdateTaskStatus: (projectId: string, taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (projectId: string, taskId: string) => void;
  onDeleteProject: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAddTask,
  onUpdateTaskStatus,
  onDeleteTask,
  onDeleteProject,
}) => {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const progress = useMemo(() => {
    if (project.tasks.length === 0) return 0;
    const doneTasks = project.tasks.filter((task) => task.status === TaskStatus.Done).length;
    return (doneTasks / project.tasks.length) * 100;
  }, [project.tasks]);

  const handleSuggestTasks = async () => {
    setIsSuggesting(true);
    setError(null);
    try {
      const suggestedTaskDescriptions = await suggestTasks(project.name);
      const today = new Date();
      today.setDate(today.getDate() + 7); // Default due date: 1 week from now
      const dueDate = today.toISOString().split('T')[0];

      suggestedTaskDescriptions.forEach(task => {
        onAddTask(project.id, task.description, dueDate);
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSuggesting(false);
    }
  };
  
  const canSuggest = !!process.env.API_KEY;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-2xl p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-slate-100">{project.name}</h2>
        <button
          onClick={() => onDeleteProject(project.id)}
          className="text-slate-500 hover:text-red-400 transition-colors"
          aria-label="Delete project"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
      <ProgressBar progress={progress} />

      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-slate-300">Tasks ({project.tasks.length})</h3>
            {canSuggest && (
                 <button
                    onClick={handleSuggestTasks}
                    disabled={isSuggesting}
                    className="flex items-center gap-2 text-sm bg-teal-600/50 hover:bg-teal-600 text-white font-semibold py-1 px-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-wait"
                >
                    ✨ {isSuggesting ? 'Suggesting...' : 'Suggest Tasks'}
                </button>
            )}
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        {project.tasks.length > 0 ? (
          <div>
            {project.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdateStatus={(newStatus) => onUpdateTaskStatus(project.id, task.id, newStatus)}
                onDelete={() => onDeleteTask(project.id, task.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 bg-slate-800 py-4 rounded-lg">No tasks yet. Add one below!</p>
        )}
      </div>

      <div className="mt-6 border-t border-slate-700 pt-4">
        <AddTaskForm onAddTask={(desc, date) => onAddTask(project.id, desc, date)} />
      </div>
    </div>
  );
};

export default ProjectCard;
