// src/TaskManager.tsx
import { db } from './firebaseConfig'; // Ensure this path is correct
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';

// Function to add a task
export const addTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    console.log('Task added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding task: ', e);
  }
};

// Function to subscribe to tasks
export const subscribeToTasks = (callback) => {
  const q = query(collection(db, 'tasks'));
  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });
};
