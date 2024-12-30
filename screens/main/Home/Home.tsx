import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Alert, FlatList, TextInput, Image, Modal } from 'react-native';
import { CommonStyles } from '../../../comman/components';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonAppBar from '../../../comman/components/AppBar';
import AppText from '../../../comman/components/AppText';
import SubmitButton from '../../../comman/components/Submitbtn';
import colors from '../../../comman/colors';

function Home() {
  const Navigator: any = useNavigation();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    education: '',
    address: '',
    mobileNumber: '',
    aadharNumber: '',
  });

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUsers = await AsyncStorage.getItem('customInfo');
        const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
        setUsers(usersArray);
        setFilteredUsers(usersArray); // Initialize filtered users
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('loggedInUser');
      Navigator.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'There was an issue logging out.');
    }
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setFilteredUsers(users); // Reset to original users when search text is cleared
    } else {
      const lowerText = text.toLowerCase();
      const filtered = users.filter(
        (user: any) =>
          user.firstName.toLowerCase().includes(lowerText) ||
          user.lastName.toLowerCase().includes(lowerText) ||
          user.aadharNumber.toLowerCase().includes(lowerText)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleAddUser = () => {
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    // Form validation
    const { firstName, lastName, education, address, mobileNumber, aadharNumber } = newUser;

    if (!firstName || !lastName || !education || !address || !mobileNumber || !aadharNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    // Mobile number should be 10 digits
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      Alert.alert('Error', 'Mobile number should be 10 digits.');
      return;
    }

    // Aadhar number should be 12 digits
    const aadharRegex = /^[0-9]{12}$/;
    if (!aadharRegex.test(aadharNumber)) {
      Alert.alert('Error', 'Aadhar number should be 12 digits.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('customInfo');
      const usersArray = storedUsers ? JSON.parse(storedUsers) : [];
      usersArray.push(newUser);

      // Save the updated list to AsyncStorage
      await AsyncStorage.setItem('customInfo', JSON.stringify(usersArray));

      // Update the state with the new list
      setUsers(usersArray);
      setFilteredUsers(usersArray);

      // Close the modal after submission
      setModalVisible(false);

      // Show success alert
      Alert.alert('Success', 'User added successfully!');

      // Clear form fields
      setNewUser({
        firstName: '',
        lastName: '',
        education: '',
        address: '',
        mobileNumber: '',
        aadharNumber: '',
      });

    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'There was an issue saving the user data.');
    }
  }
  const handleCancel = () => {
    setModalVisible(false);
    setNewUser({
      firstName: '',
      lastName: '',
      education: '',
      address: '',
      mobileNumber: '',
      aadharNumber: '',
    });
  }

  // Function to navigate to customer profile screen
  const goToProfile = (customer: any) => {
    Navigator.navigate('Profile', { customer });
  };
  const handleUpload = (customer: any) => {
    // Navigator.navigate('Profile', { customer });
  };

  const renderUserCard = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => goToProfile(item)} style={styles.card}>
      <View style={styles.cardContent}>
        <View style={{ flex: 1 }}>
          <AppText style={styles.cardTitle}>{item.firstName} {item.lastName}</AppText>
          <AppText style={styles.cardText}>Aadhar Number: {item.aadharNumber}</AppText>
          <AppText style={styles.cardText}>Address: {item.address}</AppText>
          <AppText style={styles.cardText}>Mobile: {item.mobileNumber}</AppText>
        </View>
        <TouchableOpacity onPress={() => handleUpload(item)} style={styles.uploadButton}>
          <AppText style={styles.uploadButtonText}>Upload Document</AppText>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={[CommonStyles.container, CommonStyles.bgwhite]}>
      <CommonAppBar title="Home" showBackButton={true} onLogout={handleLogout} />

      <View style={styles.searchContainer}>
        <Image
          source={require('../../../assets/icons/search.png')} // Path to your image
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by first name or last name"
          placeholderTextColor="#7f8c8d"
          value={searchText}
          onChangeText={handleSearch}
        />
        {/* <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
          <AppText style={styles.addButtonText}>+</AppText>
        </TouchableOpacity> */}
      </View>

      <FlatList
        data={filteredUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderUserCard}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={
          <AppText style={styles.noDataText}>No user information available.</AppText>
        }
      />

      {/* Modal for adding new user */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle}>Add New User</AppText>
            {['firstName', 'lastName', 'education', 'address', 'mobileNumber', 'aadharNumber'].map((field) => {
              const placeholderText: any = {
                firstName: 'Enter First Name',
                lastName: 'Enter Last Name',
                education: 'Enter Education',
                address: 'Enter Address',
                mobileNumber: 'Enter Mobile Number',
                aadharNumber: 'Enter Aadhar Number'
              };

              const labelText: any = {
                firstName: 'First Name',
                lastName: 'Last Name',
                education: 'Education',
                address: 'Address',
                mobileNumber: 'Mobile Number',
                aadharNumber: 'Aadhar Number'
              };

              return (
                <View key={field} style={styles.inputContainer}>
                  <AppText style={styles.inputLabel}>{labelText[field]}</AppText>  {/* Label */}
                  <TextInput
                    style={styles.modalInputInput}
                    placeholder={placeholderText[field]} // Dynamic placeholder text
                    value={newUser[field]}
                    onChangeText={(text) => setNewUser({ ...newUser, [field]: text })}
                  />
                </View>
              );
            })}
            <View style={styles.buttonContainer}>
              <SubmitButton title="Submit" onPress={handleSubmit} />
              <SubmitButton title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={handleAddUser} style={styles.floatingAddButton}>
        <AppText style={styles.floatingAddButtonText}>+</AppText>
      </TouchableOpacity>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Poppins-Regular',
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.white, // Background matches the light theme
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: colors.GrayColor, // Border matches the theme
    borderWidth: 1,
    shadowColor: colors.black, // Shadow color matches the theme
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: colors.JapaneseIndigo, // Primary text color from theme
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.OsloGrey, // Secondary text color from theme
    marginBottom: 4,
  },
  noDataText: {
    fontSize: 16,
    color: colors.OsloGrey,
    textAlign: 'center',
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    fontSize: 16,
    color: colors.JapaneseIndigo,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: colors.GrayColor,
    paddingHorizontal: 12,
    paddingVertical: 6,
    // justifyContent: 'space-between',
  },
  searchIcon: {
    width: 20, // Set width and height for the icon
    height: 20,
    marginRight: 10,
  },
  addButton: {
    marginLeft: 10,
    padding: 8,
    backgroundColor: colors.themeColor, // Theme color for the button
    borderRadius: 4,
  },
  addButtonText: {
    color: colors.white, // White text color for the button
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    width: '80%',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
  },
  modalInput: {
    height: 40,
    borderColor: colors.GrayColor,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    marginBottom: 15, // Space between fields
    width: '100%', // Full width of the container
  },
  inputLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5, // Space between label and input
    fontFamily: 'Poppins-Regular', // Change font if needed
  },
  modalInputInput: {
    height: 45,
    borderColor: colors.fieldblue,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 14,
    color: colors.darkCharcoal,
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Ensure there's space between the buttons
    marginTop: 20, // Space from the input fields
    width: '100%', // Full width of the container
  },
  floatingAddButton: {
    position: 'absolute',
    bottom: 30, // Distance from the bottom of the screen
    right: 25, // Distance from the right edge of the screen
    width: 60, // Button size
    height: 60,
    backgroundColor: colors.themeColor, // Theme color for the button
    borderRadius: 30, // Circular shape
    justifyContent: 'center',
    alignItems: 'center', // Center align the "+" text
    shadowColor: colors.black, // Shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  floatingAddButtonText: {
    color: colors.white, // White text color for the button
    fontSize: 30, // Larger font size for "+"
    fontFamily: 'Poppins-Bold',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between text and upload button
  },
  uploadButton: {
    backgroundColor: colors.themeColor, // Theme color for the button
    borderRadius: 5, // Rounded corners
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 2, // Shadow for Android
    shadowColor: colors.black, // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  uploadButtonText: {
    color: colors.white, // White text color
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});
