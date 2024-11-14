import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path is correct

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskList);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const renderTask = ({ item }) => (
    <View style={styles.taskItem}>
      <Text style={styles.taskName}>{item.task}</Text>
      <Text style={styles.taskDetails}>
        Date: {item.date} - Time: {item.time} - Recurring: {item.recurring}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks List</Text>
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  taskName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  taskDetails: {
    color: '#555',
  },
});

export default TaskList;
