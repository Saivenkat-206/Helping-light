import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { MaterialIcons } from '@expo/vector-icons'; // Ensure you have installed this package

const CallContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'contacts'), (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleCall = (phoneNumber) => {
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    Alert.alert('Error', 'Invalid phone number.');
    return;
  }

  console.log(`Attempting to call: ${phoneNumber}`); // Debugging line
  const url = `tel:${phoneNumber}`;
  Linking.openURL(url)
    .then(() => console.log("Dialer opened")) // Log success
    .catch((err) => console.error("Error launching dialer", err)); // Log error
};



  const renderContact = ({ item }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => handleCall(item.phone)} style={styles.callButton}>
        <MaterialIcons name="call" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
  },
  contactPhone: {
    color: '#555',
  },
  callButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
});

export default CallContact;
