import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CommonStyles } from '../../../comman/components';
import CommonAppBar from '../../../comman/components/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../comman/components/AppText';
import colors from '../../../comman/colors';

function Profile({ route }: any) {
  const { customer } = route.params; // Get customer data from navigation params
  console.log("route.params customer------------------>", customer);
  const navigation: any = useNavigation();
  // Function to handle the document upload
  const handleUploadDocument = () => {
    Alert.alert('Upload Document', 'You can upload a document here.');
    // Add your document upload logic here (e.g., opening file picker)
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'There was an issue logging out.');
    }
  };

  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <CommonAppBar title="Customer Details" showBackButton={true} onLogout={handleLogout} />
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Customer Profile</AppText>
        <TouchableOpacity onPress={handleUploadDocument} style={styles.uploadButton}>
          <AppText style={styles.uploadButtonText}>Upload Document</AppText>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.profileCard}>
          {/* <AppText style={styles.header}>Customer Profile</AppText> */}

          <View style={styles.infoRow}>
            <AppText style={styles.label}>First Name:</AppText>
            <AppText style={styles.text}>{customer.firstName}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Last Name:</AppText>
            <AppText style={styles.text}>{customer.lastName}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Education:</AppText>
            <AppText style={styles.text}>{customer.education}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Address:</AppText>
            <AppText style={styles.text}>{customer.address}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Mobile Number:</AppText>
            <AppText style={styles.text}>{customer.mobileNumber}</AppText>
          </View>

          <View style={styles.infoRow}>
            <AppText style={styles.label}>Aadhar Number:</AppText>
            <AppText style={styles.text}>{customer.aadharNumber}</AppText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
  },
  uploadButton: {
    backgroundColor: colors.fieldfade,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5, // For Android shadow
  },
  header: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
    color: colors.darkCharcoal,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-semibold',
    color: colors.headerborder,
  },
  text: {
    fontSize: 16,
    color: colors.darkCharcoal,
    textAlign: 'right',
    flex: 1,
  },
});

export default Profile;
