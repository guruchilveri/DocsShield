import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import { CommonStyles } from '../../../comman/components';
import CommonAppBar from '../../../comman/components/AppBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import AppText from '../../../comman/components/AppText';
import colors from '../../../comman/colors';

function Profile({ route }: any) {
  const { customer } = route.params;
  const navigation: any = useNavigation();
  const [imageDetails, setImageDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for full-screen image preview

  const handleUploadDocument = () => {
    Alert.alert('Upload Document', 'You can upload a document here.');
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

  const getCustomerImageDetails = async () => {
    try {
      const storedData = await AsyncStorage.getItem('customInfo');
      if (!storedData) {
        Alert.alert('Error', 'No customer data found.');
        setLoading(false);
        return;
      }

      const customerArray: any[] = JSON.parse(storedData);
      const matchedCustomer = customerArray.find((c) => c.aadhaarNumber === customer.aadhaarNumber);

      if (!matchedCustomer) {
        Alert.alert('Error', 'Customer not found.');
        setLoading(false);
        return;
      }

      const existingImageDetails = matchedCustomer.imageDetails || [];
      setImageDetails(existingImageDetails);
    } catch (error) {
      console.error('Error retrieving customer details:', error);
      Alert.alert('Error', 'Failed to retrieve customer details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomerImageDetails();
  }, []);

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(imagePath); // Set selected image for full-screen view
  };

  const closeFullScreenImage = () => {
    setSelectedImage(null); // Close the full-screen image
  };

  if (loading) {
    return <AppText>Loading...</AppText>;
  }

  if (!imageDetails || imageDetails.length === 0) {
    return <AppText>No images found for this customer.</AppText>;
  }

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
      <FlatList
        data={imageDetails}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true} // Align images horizontally
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImageClick(item.path)}>
            <Image
              source={{ uri: item.path }}
              style={styles.imageThumbnail}
              resizeMode="cover"
            />
          </TouchableOpacity>
        )}
      />

      {/* Modal for full-screen image preview */}
      {selectedImage && (
        <Modal
          visible={true}
          transparent={true}
          animationType="fade"
          onRequestClose={closeFullScreenImage}
        >
          <TouchableWithoutFeedback onPress={closeFullScreenImage}>
            <View style={styles.modalContainer}>
              <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
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
    elevation: 5,
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
  imageThumbnail: {
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default Profile;
