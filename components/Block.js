import React from 'react';
import { View, StyleSheet } from 'react-native';

const Block = props => {
    return <View style={styles.blocks}>{props.children}</View>;
};

const styles = StyleSheet.create({
    blocks: {
        flex: 1,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: 'black',
        height: '50%',
        width: '100%'
    }
});

export default Block;
