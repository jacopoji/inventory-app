import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

import Card from '../components/Card';
import localIpAddress from '../constants/localIpAddress';

import configuration from '../constants/configuration';
const language = configuration.language;

const EditCompanyScreen = (props) => {
    const [companyName, setCompanyName] = useState(
        props.navigation.getParam('name')
    );
    const localIp = localIpAddress.localIp;

    const dismissHandler = () => {
        resetStates();
        props.navigation.goBack();
    };

    function resetStates() {
        setCompanyName('');
    }

    const submitHandler = () => {
        updateData(props.navigation.getParam('id'));
        // resetStates();
        props.navigation.getParam('handler', () => {
            console.log('Empty function');
        });
        props.navigation.navigate('Home', {
            name: companyName,
        });
    };

    async function updateData(updateId) {
        const data = {
            name: companyName,
            companyId: updateId,
        };
        try {
            const responst = await fetch(`http://${localIp}:3000/Company/`, {
                method: 'PATCH',
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
                        placeholder={props.navigation.getParam('name')}
                        autoCapitalize='characters'
                        autoCompleteType='off'
                        autoCorrect={false}
                        autoFocus={true}
                        clearTextOnFocus={true}
                        keyboardType='default'
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
    );
};

const languageSet = {
    cancel: ['Cancel', '取消'],
    confirm: ['Confirm', '确认'],
    company_name: ['Company Name', '公司名称'],
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

export default EditCompanyScreen;
