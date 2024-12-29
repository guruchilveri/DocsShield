import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStack from './navigators/MainStack';
import AuthStack from './navigators/AuthStack';

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
        screenOptions={{
          headerShown: false,
        }}
      >
        {alreadyLoggedIn ? (
          // User is logged in, render MainStack
          <RootStack.Screen name="Main" component={MainStack} />
        ) : (
          // User is not logged in, render AuthStack
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
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
