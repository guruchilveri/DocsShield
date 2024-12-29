import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../colors';
import AppText from './AppText';

const SubmitButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <AppText style={styles.buttonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.themeColor,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default SubmitButton;
