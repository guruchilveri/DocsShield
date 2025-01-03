import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ImageDetail {
    filename: string;
    mime: string;
    modificationDate: string;
    path: string;
    size: number;
    height: number;
    width: number;
}

interface Customer {
    aadharNumber: string;
    firstName: string;
    lastName: string;
    education: string;
    address: string;
    mobileNumber: string;
    imageDetails?: ImageDetail[];
}

export const addCustomerImageDetails = async (
    aadhaarNumber: string,
    capturedPhotoDetails: ImageDetail
) => {
    try {
        // Retrieve customer details array from AsyncStorage
        const storedData = await AsyncStorage.getItem('customInfo');
        console.log('storedData:------------>', storedData);
        console.log('aadhaarNumber:------------>', aadhaarNumber);
        const customerArray: Customer[] = storedData ? JSON.parse(storedData) : [];
        console.log('customerArray:------------>', customerArray);

        // Find the customer object by Aadhaar number
        const customerIndex = customerArray.findIndex(
            (customer) => customer.aadharNumber === aadhaarNumber
        );

        if (customerIndex === -1) {
            Alert.alert('Error', 'Customer not found with the provided Aadhaar number.');
            console.log('customerIndex:------------>', customerIndex);
            return;
        }

        // Update or initialize the imageDetails array
        const existingImageDetails = customerArray[customerIndex].imageDetails || [];
        const updatedImageDetails = [...existingImageDetails, capturedPhotoDetails];

        const updatedCustomer = {
            ...customerArray[customerIndex],
            imageDetails: updatedImageDetails,
        };

        // Update the customer array
        customerArray[customerIndex] = updatedCustomer;

        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem('customInfo', JSON.stringify(customerArray));

        Alert.alert('Success', 'Customer image details updated successfully.');
    } catch (error) {
        console.error('Error updating customer details:', error);
        Alert.alert('Error', 'Failed to update customer details.');
    }
};
