import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../../comman/colors';
import AppText from '../../../comman/components/AppText';
// Define interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  aadharNumber: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Define interface for user data (stored in AsyncStorage)
interface UserData {
  firstName: string;
  lastName: string;
  aadharNumber: string;
  phone: string;
  password: string;
}


const Signup = ({ navigation }: any) => {

  const [formData, setFormData] = useState<FormData>({
    firstName: 'Gaurav',
    lastName: 'Chaudhary',
    aadharNumber: '123456789012',
    phone: '1234567890',
    password: 'Test@123',
    confirmPassword: 'Test@123',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const checkUserExists = async (phone: string, aadharNumber: string): Promise<boolean> => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      return users.some((user) => user.phone === phone || user.aadharNumber === aadharNumber);
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const saveUser = async (userData: UserData): Promise<void> => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users: UserData[] = storedUsers ? JSON.parse(storedUsers) : [];
      users.push(userData);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      console.log('User saved successfully:', userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const { firstName, lastName, aadharNumber, phone, password, confirmPassword } = formData;

    // Validation
    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First Name is required.');
      return;
    }
    if (!lastName.trim()) {
      Alert.alert('Validation Error', 'Last Name is required.');
      return;
    }
    if (!aadharNumber.trim() || aadharNumber.length !== 12) {
      Alert.alert('Validation Error', 'Aadhar Card Number must be 12 digits.');
      return;
    }
    if (!phone.trim() || !/^\d{10}$/.test(phone)) {
      Alert.alert('Validation Error', 'Phone Number must be 10 digits.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    const userExists = await checkUserExists(phone, aadharNumber);
    if (userExists) {
      Alert.alert('Error', 'User already exists with this phone number or Aadhar number.');
      return;
    }

    // Save user and redirect to Login
    const newUser: UserData = { firstName, lastName, aadharNumber, phone, password };
    await saveUser(newUser);
    Alert.alert('Success', 'Registration successful! Redirecting to Login.');
    navigation.navigate('Login'); // Redirect to Login screen
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppText style={styles.title}>Signup</AppText>

      {/* First Name */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>First Name</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter First Name"
          value={formData.firstName}
          onChangeText={(value) => handleInputChange('firstName', value)}
        />
      </View>

      {/* Last Name */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Last Name</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Last Name"
          value={formData.lastName}
          onChangeText={(value) => handleInputChange('lastName', value)}
        />
      </View>

      {/* Aadhar Card Number */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Aadhar Card Number</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Aadhar Card Number"
          keyboardType="numeric"
          maxLength={12}
          value={formData.aadharNumber}
          onChangeText={(value) => handleInputChange('aadharNumber', value)}
        />
      </View>

      {/* Phone Number */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Phone Number</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Phone Number"
          keyboardType="numeric"
          maxLength={10}
          value={formData.phone}
          onChangeText={(value) => handleInputChange('phone', value)}
        />
      </View>

      {/* Password */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Password</AppText>
        <TextInput
          style={styles.input}
          placeholder="Enter Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
        />
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <AppText style={styles.label}>Confirm Password</AppText>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <AppText style={styles.buttonText}>Signup</AppText>
      </TouchableOpacity>

      {/* Sign-Up Section */}
      <View style={styles.signupContainer}>
        <AppText style={styles.signupText}>Do you already have an account?</AppText>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText style={styles.signupLink}>Login</AppText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.whitesmoke,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: colors.themeColor,
    margin: 30,
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
    borderColor: '#CCC',
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

export default Signup;
