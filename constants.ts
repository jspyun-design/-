
import { TaskStatus } from './types';

export const TASK_STATUS_OPTIONS = [
  TaskStatus.ToDo,
  TaskStatus.InProgress,
  TaskStatus.Done,
];

export const TASK_STATUS_COLORS: { [key in TaskStatus]: { bg: string; text: string; ring: string } } = {
  [TaskStatus.ToDo]: {
    bg: 'bg-gray-700',
    text: 'text-gray-200',
    ring: 'ring-gray-500',
  },
  [TaskStatus.InProgress]: {
    bg: 'bg-blue-900',
    text: 'text-blue-200',
    ring: 'ring-blue-500',
  },
  [TaskStatus.Done]: {
    bg: 'bg-green-900',
    text: 'text-green-200',
    ring: 'ring-green-500',
  },
};
