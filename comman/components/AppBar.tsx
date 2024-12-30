import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../colors';

interface CommonAppBarProps {
  title: string;
  showBackButton?: boolean;
  onLogout?: () => void;
  statusBarColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
}

const CommonAppBar: React.FC<CommonAppBarProps> = ({
  title,
  showBackButton = false,
  onLogout,
  statusBarColor = colors.themeColor,
  statusBarStyle = 'light-content',
}) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }
    // await AsyncStorage.removeItem('loggedInUser');
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Login' }],
    // });
  };

  return (
    <>
      <StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
      <View style={[styles.appBar, { backgroundColor: statusBarColor }]}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
            <Image
              source={require('../../assets/icons/rightArrow.png')} // Replace with the path to your image
              style={[styles.backButtonImage, { transform: [{ rotate: '180deg' }] }]} // Rotated by 180 degrees
              resizeMode="contain"
              tintColor={colors.white}
            />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutButton}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonContainer: {
    padding: 10,
  },
  backButtonImage: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-semibold',
    color: colors.white,
    flex: 1,
    textAlign: 'center',
  },
  logoutButton: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'Poppins-semibold',
    padding: 10,
  },
});

export default CommonAppBar;
