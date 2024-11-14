import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';  // Ensure the correct path to firebaseConfig

const AddContact = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const addOrUpdateContact = async () => {
    if (name && phone) {
      try {
        // Check if the contact already exists
        const contactsCollection = collection(db, 'contacts');
        const q = query(contactsCollection, where('name', '==', name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // If the contact exists, update it
          const existingContact = querySnapshot.docs[0];
          const contactRef = doc(db, 'contacts', existingContact.id);
          await updateDoc(contactRef, { phone });
          Alert.alert('Success', `Contact ${name} updated!`);
        } else {
          // If the contact does not exist, add a new one
          await addDoc(collection(db, 'contacts'), {
            name,
            phone,
          });
          Alert.alert('Success', `Contact ${name} added!`);
        }
        
        setName('');
        setPhone('');
      } catch (error) {
        console.error('Error adding/updating contact: ', error);
        Alert.alert('Error', 'There was an issue saving the contact.');
      }
    } else {
      Alert.alert('Error', 'Please enter a name and phone number.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Emergency Contact</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button title="Add/Update Contact" onPress={addOrUpdateContact} />
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
});

export default AddContact;
