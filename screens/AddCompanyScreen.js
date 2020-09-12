import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import Card from '../components/Card';
import localIpAddress from '../constants/localIpAddress';

import configuration from '../constants/configuration';
const language = configuration.language;

const AddCompanyScreen = (props) => {
    const [companyName, setCompanyName] = useState('');
    const [companyContact, setCompanyContact] = useState('');
    const localIp = localIpAddress.localIp;

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
        props.navigation.getParam('handler', () => {
            console.log('Empty function');
        });
        props.navigation.navigate('Home', {
            name: companyName,
            contact: companyContact,
        });
    };

    async function sendData() {
        const data = {
            name: companyName,
            contact: companyContact,
        };
        try {
            const response = await fetch(`http://${localIp}:3000/Company`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Card>
                    <View style={styles.cardContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.company_name[language]}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            value={companyName}
                            onChangeText={(text) => {
                                setCompanyName(text);
                            }}
                            placeholder={
                                languageSet.enter_company_name[language]
                            }
                            autoCapitalize='characters'
                            autoCompleteType='off'
                            autoCorrect={false}
                            autoFocus={true}
                            clearTextOnFocus={true}
                            keyboardType='default'
                        />
                    </View>
                    <View style={styles.cardContainer}>
                        <Text style={styles.fontStyle}>
                            {languageSet.contact[language]}
                        </Text>
                        <TextInput
                            style={styles.inputContainer}
                            value={companyContact}
                            onChangeText={(text) => {
                                setCompanyContact(text);
                            }}
                            placeholder={languageSet.enter_contact[language]}
                            clearTextOnFocus={true}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title={languageSet.confirm[language]}
                            onPress={submitHandler}
                        />
                        <Button
                            title={languageSet.cancel[language]}
                            onPress={dismissHandler}
                        />
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    );
};

const languageSet = {
    cancel: ['Cancel', '取消'],
    confirm: ['Confirm', '确认'],
    enter_contact: ['Contact?', '请输入联系方式'],
    contact: ['Contact: ', '联系方式：'],
    company_name: ['Company name', '公司名称'],
    enter_company_name: ['Company name?', '请输入公司名称'],
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'stretch',
    },
    cardContainer: {
        marginHorizontal: 20,
        paddingTop: 20,
    },
    inputContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        minWidth: 250,
        fontSize: 30,
        maxWidth: 250,
    },
});

export default AddCompanyScreen;
