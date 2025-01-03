import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Text,
    Platform,
} from 'react-native';
import ImagePicker, { Image as ImagePickerResponse } from 'react-native-image-crop-picker';
import { request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import colors from '../colors';
import AppText from './AppText';
import SubmitButton from './Submitbtn';

interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onPhotoCaptured: (photo: ImagePickerResponse) => void;
}

const CameraModal: React.FC<CameraModalProps> = ({ visible, onClose, onPhotoCaptured }) => {
    const handleCameraOpen = async () => {
        try {
            const permission: PermissionStatus = await request(
                Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.CAMERA
                    : PERMISSIONS.IOS.CAMERA
            );

            if (permission === 'granted') {
                const photo = await ImagePicker.openCamera({
                    width: 300,
                    height: 300,
                    cropping: false,
                    includeBase64: false,
                });
                onPhotoCaptured(photo);
                onClose();
            } else {
                console.warn('Camera permission denied');
            }
        } catch (error) {
            console.error('Error opening camera:', error);
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <AppText style={styles.modalTitle}>Upload Document</AppText>
                    <TouchableOpacity style={styles.iconContainer} onPress={handleCameraOpen}>
                        <View style={styles.iconWrapper}>
                            <Image
                                style={styles.icon}
                                tintColor={colors.themeColor}
                                source={require('../../assets/icons/cameraIcon.png')} // Replace with your camera icon
                            />
                        </View>
                        <AppText style={styles.iconText}>Open Camera</AppText>
                    </TouchableOpacity>
                    <SubmitButton title="Close" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: colors.white,
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginVertical: 20,
        justifyContent: 'center',
        padding: 10,
        margin: 10,
    },
    icon: {
        width: 50,
        height: 50,
        // marginBottom: 10,
    },
    closeButton: {
        marginTop: 20,
    },
    closeText: {
        color: 'blue',
    },
    iconWrapper: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    iconText: {
        fontSize: 16,
        color: '#555',
    },
});

export default CameraModal;
