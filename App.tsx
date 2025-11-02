
import React, { useState, useCallback } from 'react';
import { Project, Task, TaskStatus } from './types';
import Header from './components/Header';
import AddProjectForm from './components/AddProjectForm';
import ProjectCard from './components/ProjectCard';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleAddProject = useCallback((name: string) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name,
      tasks: [],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  }, []);

  const handleDeleteProject = useCallback((projectId: string) => {
    setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
  }, []);

  const handleAddTask = useCallback((projectId: string, description: string, dueDate: string) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      description,
      dueDate,
      status: TaskStatus.ToDo,
    };
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === projectId ? { ...p, tasks: [...p.tasks, newTask] } : p
      )
    );
  }, []);

  const handleUpdateTaskStatus = useCallback((projectId: string, taskId: string, newStatus: TaskStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
              ),
            }
          : p
      )
    );
  }, []);

  const handleDeleteTask = useCallback((projectId: string, taskId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === projectId
          ? { ...p, tasks: p.tasks.filter((t) => t.id !== taskId) }
          : p
      )
    );
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <main className="container mx-auto px-4 py-8">
        <Header />
        <AddProjectForm onAddProject={handleAddProject} />

        <div className="mt-12">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onAddTask={handleAddTask}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                  onDeleteTask={handleDeleteTask}
                  onDeleteProject={handleDeleteProject}
                />
              ))}
            </div>
          ) : (
             <div className="text-center py-16 px-6 bg-slate-800 rounded-xl border border-dashed border-slate-600">
                <h2 className="text-2xl font-semibold text-slate-300">No Projects Yet</h2>
                <p className="mt-2 text-slate-500">Start by adding your first project above to get organized.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
