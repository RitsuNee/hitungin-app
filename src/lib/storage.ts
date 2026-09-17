import { Project } from '../types';

const STORAGE_KEY = 'hpp_calculator_projects';

export const getProjects = (): Project[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProject = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find((p) => p.id === id);
};

export const saveProject = (project: Project): void => {
  if (typeof window === 'undefined') return;
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === project.id);
  
  if (index >= 0) {
    projects[index] = { ...project, updatedAt: Date.now() };
  } else {
    projects.push({ ...project, createdAt: Date.now(), updatedAt: Date.now() });
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: string): void => {
  if (typeof window === 'undefined') return;
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
