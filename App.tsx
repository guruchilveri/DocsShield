import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './screens/auth/Onboarding/Onboarding';
import Login from './screens/auth/login/Login';
import Signup from './screens/auth/signup/Signup';
import Home from './screens/main/Home/Home';

const RootStack = createStackNavigator();

export default function App() {
  const [alreadyLoggedIn, setAlreadyLoggedIn] = React.useState<boolean | null>(null);

  // Function to check if the user is logged in
  const checkLoginStatus = async () => {
    try {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      console.log('loggedInUser:', loggedInUser);
      const user = loggedInUser ? JSON.parse(loggedInUser) : null;
      setAlreadyLoggedIn(!!user); // If user exists, set to true; otherwise, false
    } catch (error) {
      console.error('Error checking login status:', error);
      setAlreadyLoggedIn(false);
    }
  };

  // Run the login status check when the app starts
  React.useEffect(() => {
    checkLoginStatus();
  }, []);

  if (alreadyLoggedIn === null) {
    // Show a loading spinner while checking login status
    return (
      <View style={styles.main}>
        <ActivityIndicator size="large" color="#FF914D" />
      </View>
    );
  }
  console.log('alreadyLoggedIn:', alreadyLoggedIn);
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={alreadyLoggedIn ? 'Home' : 'Login'}
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name='Onboarding' component={Onboarding} />
        <RootStack.Screen name='Login' component={Login} />
        <RootStack.Screen name='Signup' component={Signup} />
        <RootStack.Screen name='Home' component={Home} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Poppins-Light',
  },
});
