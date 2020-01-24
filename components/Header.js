import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/Color';

const Header = props => {
    return (
        <View style={styles.headerStyle}>
            <Text style={styles.fontStyle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Color.mediumBlue,
        height: '10%',
        paddingTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    fontStyle: {
        fontSize: 30,
        textAlign: 'center',
        color: Color.secondaryColor
    }
});

export default Header;
