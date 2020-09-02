import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import {
    ActionSheetProvider,
    connectActionSheet,
    useActionSheet,
} from '@expo/react-native-action-sheet';

import ActionSheet from '../components/ActionSheet';
import Card from '../components/Card';
import Block from '../components/Block';
import Color from '../constants/Color';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Ionicons } from '@expo/vector-icons';
import localIpAddress from '../constants/localIpAddress';
import { Asset } from 'expo-asset';

const ModelScreen = (props) => {
    const [image, setImage] = useState(null);
    // const [uploadImageData, setUploadImageData] = useState(null);
    const [shouldUpload, setShouldUplade] = useState(false);
    const localIp = localIpAddress.localIp;

    useEffect(() => {
        getPermissionAsync();
        ImagePicker.requestCameraPermissionsAsync();
        props.navigation.setParams({
            pickImage: _pickImage,
            takeImage: _takeImage,
        });
        if (image == null) {
            setImage(
                //require('../assets/photo_1592854176857_8BC0327C-F48C-4FAA-A8C9-101FB5500C14.jpg')
                require('../images/CA9E1D94-94E7-4C96-9BDC-B8B306D2CA4B.jpg')
            );
        }
        if (image != null && shouldUpload) {
            //console.log(image);
            uploadImage();
            setShouldUplade(false);
        }
        console.log(image);
    }, [image]);

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
            );
            if (status !== 'granted') {
                alert(
                    'Sorry, we need camera roll permissions to make this work!'
                );
            }
        }
    };

    async function _pickImage() {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                console.log('before' + image);
                setShouldUplade(true);
                setImage(result);
                console.log('after' + image);
                // setUploadImageData(result);
            }

            // console.log(result);
            // console.log(
            //     'type: ' + result.type + ' fileName: ' + result.fileName
            // );
        } catch (E) {
            console.log(E);
        }
    }

    async function _takeImage() {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                setShouldUplade(true);
                setImage(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const createFormData = (photo, body) => {
        const data = new FormData();
        console.log('Platform OS =' + Platform.OS);
        console.log(photo);
        data.append('photo', {
            name: photo.uri.split('/').pop(), //extension is important as it defines save file format
            type: photo.type,
            uri:
                Platform.OS === 'android'
                    ? photo.uri
                    : photo.uri.replace('file://', ''),
        });

        Object.keys(body).forEach((key) => {
            data.append(key, body[key]);
        });
        console.log(photo.uri.split('/').pop());

        return data;
    };

    async function uploadImage() {
        try {
            const response = await fetch(
                `http://${localIp}:3000/company/uploadImage`,
                {
                    method: 'POST',
                    body: createFormData(image, { companyId: companyId }),
                    headers: {
                        enctype: 'multipart/form-data',
                    },
                }
            );
            const data = response.text();
            console.log('upload succes', data);
            console.log(companyId);
            alert('Upload success!');
            //setImage(null);
        } catch (error) {
            console.log('upload error', error);
            alert('Upload failed!');
        }
    }

    // const uploadImage = () => {
    //     fetch(`http://${localIp}:3000/uploadImage`, {
    //         method: 'POST',
    //         body: createFormData(image, { userId: '123' }),
    //     })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             console.log('upload succes', response);
    //             alert('Upload success!');
    //             setImage(null);
    //         })
    //         .catch((error) => {
    //             console.log('upload error', error);
    //             alert('Upload failed!');
    //         });
    // };

    const modelData = props.navigation.getParam('modelData', {});
    const companyId = props.navigation.getParam('companyId');

    return (
        <ActionSheetProvider>
            <View style={styles.container}>
                <Card style={styles.cardContainer}>
                    <View style={styles.leftColumnContainer}>
                        <Block>
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {Platform.OS === 'android' ? (
                                    <ActionSheet
                                        pickImage={_pickImage}
                                        takeImage={_takeImage}
                                    >
                                        {image ? (
                                            <Image
                                                source={image}
                                                style={{
                                                    width: 390,
                                                    height: 320,
                                                }}
                                            />
                                        ) : (
                                            <Ionicons
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                name='ios-camera'
                                                size={32}
                                                color='blue'
                                            />
                                        )}
                                    </ActionSheet>
                                ) : image ? (
                                    <Image
                                        source={image}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    />
                                ) : (
                                    <Ionicons
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        name='ios-camera'
                                        size={32}
                                        color='blue'
                                    />
                                )}
                            </View>
                        </Block>
                        <Block>
                            <Block>
                                <View style={styles.textContainer}>
                                    <Card
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Text style={styles.fontStyle}>
                                            进价：
                                        </Text>
                                        <Text style={styles.fontStyle}>
                                            {modelData.primeCost}
                                        </Text>
                                    </Card>
                                    <Card
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Text style={styles.fontStyle}>
                                            标价：
                                        </Text>
                                        <Text style={styles.fontStyle}>
                                            {modelData.guidedPrice}
                                        </Text>
                                    </Card>
                                    <Card
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 10,
                                        }}
                                    >
                                        <Text style={styles.fontStyle}>
                                            库存：
                                        </Text>
                                        <Text
                                            style={{
                                                ...styles.fontStyle,
                                                ...(modelData.currentStock == 0
                                                    ? { color: 'red' }
                                                    : { color: 'black' }),
                                            }}
                                        >
                                            {modelData.currentStock}
                                        </Text>
                                    </Card>
                                </View>
                            </Block>
                            <Block></Block>
                            <Block></Block>
                        </Block>
                    </View>
                    {/* <View style={styles.rightColumnContainer}>
                    <Block></Block>
                    <Block></Block>
                    <Block></Block>
                </View> */}
                </Card>
            </View>
        </ActionSheetProvider>
    );
};

ModelScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('modelNumber', 'Error'),
    headerBackTitle: ' ',
    headerRight: () =>
        !(Platform.OS === 'android') && (
            <ActionSheetProvider>
                <ActionSheet
                    pickImage={navigation.getParam('pickImage', 'error')}
                    takeImage={navigation.getParam('takeImage', 'error')}
                >
                    <Ionicons
                        style={{ paddingRight: 20 }}
                        name='ios-camera'
                        size={32}
                        color='white'
                    />
                </ActionSheet>
            </ActionSheetProvider>
        ),
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor,
    },
    cardContainer: {
        flex: 1,
        marginVertical: 50,
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    leftColumnContainer: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
        width: '50%',
        flexDirection: 'column',
    },
    rightColumnContainer: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '100%',
        flexDirection: 'column',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    fontStyle: {
        fontSize: 26,
    },
});

export default ModelScreen;
