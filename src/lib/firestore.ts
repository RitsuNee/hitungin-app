import { db } from './firebase';
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore';
import { Project } from '@/types';

const COLLECTION_NAME = 'projects';

export const saveProject = async (userId: string, project: Project): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, project.id);
  // Add userId so we know who owns this document
  const projectWithUser = { ...project, userId, updatedAt: Date.now() };
  if (!project.createdAt) {
    projectWithUser.createdAt = Date.now();
  }
  await setDoc(docRef, projectWithUser);
};

export const getProjects = async (userId: string): Promise<Project[]> => {
  const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  
  const projects: Project[] = [];
  querySnapshot.forEach((doc) => {
    projects.push(doc.data() as Project);
  });
  
  // Sort descending by updated time
  return projects.sort((a, b) => b.updatedAt - a.updatedAt);
};

export const getProject = async (id: string, userId: string): Promise<Project | null> => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data() as Project & { userId?: string };
    // Only return if it belongs to the user
    if (data.userId === userId) {
      return data;
    }
  }
  return null;
};

export const deleteProject = async (id: string, userId: string): Promise<void> => {
  // Check ownership first
  const project = await getProject(id, userId);
  if (project) {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  }
};
