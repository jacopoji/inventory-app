import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator,
    FlatList
} from 'react-native';

import Card from '../components/Card';

import Company from '../Data/Company';

const MainScreen = props => {
    const pressHandler = name => {
        props.handlePress(name);
    };

    return (
        <View style={styles.cardContainer}>
            <FlatList
                data={Company.companyData}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => pressHandler(item.name)}>
                        <Card style={styles.entry}>
                            <View>
                                <Text>{item.name}</Text>
                            </View>
                        </Card>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '80%',
        paddingTop: 50
    },
    entry: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        height: 60
    }
});

export default MainScreen;
