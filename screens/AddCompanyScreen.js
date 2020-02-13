import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

import Card from '../components/Card';

const AddCompanyScreen = props => {
    const [companyName, setCompanyName] = useState('');
    const [companyContact, setCompanyContact] = useState('');

    const dismissHandler = () => {
        resetStates();
        props.navigation.goBack();
    };

    function resetStates() {
        setCompanyContact('');
        setCompanyName('');
    }

    const submitHandler = () => {
        sendData();
        // resetStates();
        console.log(
            props.navigation.getParam('handler', () => {
                console.log('Empty function');
            })
        );
        props.navigation.navigate('Home', {
            name: companyName,
            contact: companyContact
        });
    };

    async function sendData() {
        const data = {
            name: companyName,
            contact: companyContact
        };
        try {
            const response = await fetch('http://localhost:3000/Company', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <View style={styles.cardContainer}>
                    <Text style={styles.fontStyle}>公司名称</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={companyName}
                        onChangeText={text => {
                            setCompanyName(text);
                        }}
                        placeholder='请输入公司名称'
                        autoCapitalize='characters'
                        autoCompleteType='off'
                        autoCorrect={false}
                        autoFocus={true}
                        clearTextOnFocus={true}
                        keyboardType='default'
                    />
                </View>
                <View style={styles.cardContainer}>
                    <Text style={styles.fontStyle}>联系方式</Text>
                    <TextInput
                        style={styles.inputContainer}
                        value={companyContact}
                        onChangeText={text => {
                            setCompanyContact(text);
                        }}
                        placeholder='请输入联系方式'
                        clearTextOnFocus={true}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='确认' onPress={submitHandler} />
                    <Button title='取消' onPress={dismissHandler} />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch'
    },
    cardContainer: {
        marginHorizontal: 20,
        paddingTop: 20
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        minWidth: 250,
        fontSize: 30,
        maxWidth: 250
    }
});

export default AddCompanyScreen;
