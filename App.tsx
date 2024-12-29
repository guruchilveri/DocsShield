import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


const App = () => {
  return (
    <View style={styles.main}>
      <Text style={styles.customText}>Hello, Custom Font!</Text>
    </View>
  );
};


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
    fontFamily: 'Poppins-medium',
  },
});
export default App;