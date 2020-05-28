import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Color from '../constants/Color';

const Footer = props => {
    return (
        <View style={{ ...props.styles, ...styles.footerStyle }}>
            <View style={styles.containerStyle}>{props.children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: Color.gray,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    footerStyle: {
        flex: 0.1,
        width: '100%',
        justifyContent: 'flex-end'
    }
});

export default Footer;
