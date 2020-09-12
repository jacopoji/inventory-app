import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import Color from '../constants/Color';

import configuration from '../constants/configuration';
const language = configuration.language;

const SearchBar = (props) => {
    const handleSearch = () => {};
    return (
        <View style={styles.textBarStyle}>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={handleSearch}
                status='info'
                placeholder={languageSet.search[language]}
                style={{
                    borderRadius: 25,
                    borderColor: '#333',
                    backgroundColor: '#fff',
                    height: 30,
                    width: '90%',
                    paddingLeft: 15,
                }}
                textStyle={{ color: '#000' }}
            />
        </View>
    );
};

const languageSet = {
    search: ['Search', '搜索'],
};

const styles = StyleSheet.create({
    textBarStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Color.shallowBlue,
    },
    fontStyle: {
        fontSize: 32,
        textAlign: 'center',
        color: Color.white,
    },
});

export default SearchBar;
