import React from 'react';
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { CommonStyles } from '../../../comman/components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SubmitButton from '../../../comman/components/Submitbtn';

function Home() {
  const Navigator: any = useNavigation();

  const handleLogout = async () => {
    try {
      // Retrieve the stored users
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Retrieve the logged-in user
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      const user = loggedInUser ? JSON.parse(loggedInUser) : null;

      if (user) {
        // Remove the logged-in user from the array
        const updatedUsers = users.filter((storedUser: any) => storedUser.aadharNumber !== user.aadharNumber);

        // Store the updated list back to AsyncStorage
        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

        // Clear the logged-in user data
        await AsyncStorage.removeItem('loggedInUser');

        // Navigate to login screen
        Navigator.navigate('Login'); // Redirect to Auth Stack or Login Screen
      } else {
        Alert.alert('Error', 'No user found to log out.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'There was an issue logging out.');
    }
  };

  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <View style={styles.main}>
        <SubmitButton
          title="Login out"
          onPress={handleLogout} />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
  },
});
