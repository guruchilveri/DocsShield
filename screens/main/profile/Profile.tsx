import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, FlatList, Image, Modal, TouchableWithoutFeedback } from 'react-native';
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

  const renderProfileHeader = () => (
    <View>
      {/* Profile Section */}
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Customer Profile</AppText>
        <TouchableOpacity onPress={handleUploadDocument} style={styles.uploadButton}>
          <AppText style={styles.uploadButtonText}>Upload Document</AppText>
        </TouchableOpacity>
      </View>
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
      <AppText style={styles.galleryTitle}>Documents</AppText>
    </View>
  );

  return (
    <View style={{ flex: 1, width: '100%', }}>
      <CommonAppBar title="Customer Details" showBackButton={true} onLogout={handleLogout} />
      <FlatList
        data={imageDetails}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={renderProfileHeader}
        renderItem={({ item }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => handleImageClick(item.path)} style={styles.imageContainer}>
              <Image
                source={{ uri: item.path }}
                style={styles.imageThumbnail}
                resizeMode="cover"
              />
            </TouchableOpacity>
            {/* <AppText>Documents</AppText> */}
          </View>
        )}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
    width: 180,
    height: 180,
    borderRadius: 8,
  },
  galleryTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.darkCharcoal,
    marginLeft: 10,
    marginTop: 15,
  },
  imageContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.themeColor,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Profile;
