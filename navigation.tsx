import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDoReminder from '../components/ToDoReminder';
import AddContact from '../components/AddContact';
import CallContact from '../components/CallContact';
import TaskList from '../components/TaskList'; // Import the TaskList component
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ToDoReminder"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'ToDoReminder') {
              iconName = 'list-outline';
            } else if (route.name === 'AddContact') {
              iconName = 'person-add-outline';
            } else if (route.name === 'CallContact') {
              iconName = 'call-outline';
            } else if (route.name === 'Tasks') { // Add icon for Tasks
              iconName = 'checkmark-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="ToDoReminder"
          component={ToDoReminder}
          options={{ title: 'To-Do Reminder' }}
        />
        <Tab.Screen
          name="AddContact"
          component={AddContact}
          options={{ title: 'Add Emergency Contact' }}
        />
        <Tab.Screen
          name="CallContact"
          component={CallContact}
          options={{ title: 'Call Emergency Contact' }}
        />
        <Tab.Screen
          name="Tasks" // New Tab for TaskList
          component={TaskList}
          options={{ title: 'Tasks' }} // Title for the tab
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
