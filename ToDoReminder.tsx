import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore';

const ToDoReminder = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState('No');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const saveTask = async () => {
    if (task) {
      try {
        await addDoc(collection(db, 'tasks'), {
          task,
          date: date.toDateString(),
          time: time.toLocaleTimeString(),
          recurring: isRecurring,
        });
        Alert.alert('Success', 'Task added!');
        setTask('');
        setDate(new Date());
        setTime(new Date());
        setIsRecurring('No');
      } catch (error) {
        Alert.alert('Error', 'Could not save task');
      }
    } else {
      Alert.alert('Error', 'Please enter a task.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your task"
        value={task}
        onChangeText={setTask}
      />

      <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <Text style={styles.recurringText}>Is this task recurring?</Text>
      <Button title="Yes" onPress={() => setIsRecurring('Yes')} />
      <Button title="No" onPress={() => setIsRecurring('No')} />

      {/* Display the selected recurring status */}
      <Text style={styles.selectedRecurring}>
        Selected Recurring Status: {isRecurring}
      </Text>

      <Button title="Save Task" onPress={saveTask} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  recurringText: {
    marginVertical: 10,
    fontSize: 16,
  },
  selectedRecurring: {
    fontSize: 16,
    marginVertical: 5,
    color: 'blue', // Optional: Change color to make it stand out
  },
});

export default ToDoReminder;
