import React, { useState } from 'react';
import {
  StyleSheet,
  View,

  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as RootNavigation from '../../../navigators/RootNavigation'
import colors from '../../../comman/colors';
import AppText from '../../../comman/components/AppText';

// Define interface for user data (stored in AsyncStorage)
interface UserData {
  firstName: string;
  lastName: string;
  aadharNumber: string;
  phone: string;
  password: string;
}

const Login = () => {
  const [aadhaar, setAadhaar] = useState('123456789012');
  const [password, setPassword] = useState('Test@123');
  const navigation: any = useNavigation();

  const handleLogin = async () => {
    // Validation
    if (!aadhaar.trim() || aadhaar.length !== 12) {
      Alert.alert('Validation Error', 'Aadhar Card Number must be 12 digits.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }

    try {
      // Check if user exists with Aadhaar number
      const storedUsers = await AsyncStorage.getItem('users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find((user) => user.aadharNumber === aadhaar);

      if (user) {
        // Validate password
        if (user.password === password) {
          // Login successful, save user data in AsyncStorage
          await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));

          // Navigate to Home screen
          navigation.navigate('Home');
        } else {
          Alert.alert('Login Failed', 'Incorrect password.');
        }
      } else {
        Alert.alert('User Not Found', 'No user found with this Aadhaar number.');
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Login</AppText>

      {/* Aadhaar Number Input */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Aadhar Card Number</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar Card Number"
          keyboardType="numeric"
          maxLength={12}
          value={aadhaar}
          onChangeText={setAadhaar}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Password</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <AppText style={styles.buttonText}>Login</AppText>
      </TouchableOpacity>

      {/* Sign-Up Section */}
      <View style={styles.signupContainer}>
        <AppText style={styles.signupText}>Don't have an account?</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <AppText style={styles.signupLink}>Sign up</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whitesmoke,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: colors.themeColor,
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.darkCharcoal,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: colors.Chinesesilver,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.themeColor,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },
  signupContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    fontSize: 14,
    color: colors.darkCharcoal,
  },
  signupLink: {
    fontSize: 14,
    color: colors.themeColor,
    marginLeft: 5,
    fontFamily: 'Poppins-Bold',
  },
});

export default Login;
