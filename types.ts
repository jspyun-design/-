
export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface Task {
  id: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
}
