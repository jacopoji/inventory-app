import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';

import { useFocusEffect } from 'expo-next-react-navigation';
import Card from '../components/Card';
import Color from '../constants/Color';
import SearchBar from '../components/SearchBar';
// import Company from '../Data/Company';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Ionicons } from '@expo/vector-icons';
import localIpAddress from '../constants/localIpAddress';

import configuration from '../constants/configuration';
const language = configuration.language;

const MainScreen = (props) => {
    const [companyData, setCompanyData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [addingCompany, setAddingCompany] = useState(false);
    const localIp = localIpAddress.localIp;

    const pressHandler = (name) => {
        props.navigation.navigate('Company', {
            name: name,
            companyData: companyData.filter((item) => item.name == name),
            multiSelectMode: false,
        });
        //console.log(name);
    };

    async function getData() {
        try {
            const response = await fetch(`http://${localIp}:3000/Company`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setCompanyData(data);
        } catch (error) {
            console.error(error);
        }
        //console.log(companyData);
    }

    async function deleteData(deleteId) {
        try {
            const response = await fetch(
                `http://${localIp}:3000/Company/${deleteId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    // async function updateData(updateId, data) {
    //     try {
    //         const responst = await fetch(
    //             `http://localhost:3000/Company/${updateId}`,
    //             {
    //                 method: 'PATCH',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(data)
    //             }
    //         );
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    useEffect(() => {
        getData();
        console.log(language);
        //console.log('Fetching data');
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            getData();
            //console.log(companyData);
        }, [])
    );

    const refreshHandler = () => {
        setRefreshing(true);
        getData().then(() => setRefreshing(false));

        //console.log('Refreshing data');
    };

    const addingCompanyHandler = () => {
        setAddingCompany(!addingCompany);
        //console.log('Switching addingCompany state to' + addingCompany);
    };

    const deleteCompany = (deleteId) => {
        deleteData(deleteId);
        getData();
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <SwipeListView
                    data={companyData.sort((a, b) =>
                        a.name.localeCompare(b.name)
                    )}
                    //data={partners.sort((a, b) => a.name.localeCompare(b.name))}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: Color.shallowBlue }}>
                            <TouchableOpacity
                                onPress={() => pressHandler(item.name)}
                                activeOpacity={0.9}
                            >
                                <Card style={styles.entry}>
                                    <View>
                                        <Text>{item.name}</Text>
                                    </View>
                                </Card>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                    onRefresh={refreshHandler}
                    onWillFocus={refreshHandler}
                    refreshing={refreshing}
                    renderHiddenItem={({ item }) => (
                        <View style={styles.rowBack}>
                            {/* <View
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnLeft
                                ]}
                            >
                                <Text style={styles.backTextWhite}>重命名</Text>
                            </View> */}
                            <TouchableOpacity
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnLeft,
                                ]}
                                onPress={() =>
                                    props.navigation.navigate(
                                        'EditCompanyModal',
                                        {
                                            name: item.name,
                                            id: item._id,
                                        }
                                    )
                                }
                            >
                                <Text style={styles.backTextWhite}>
                                    {languageSet.rename[language]}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.backRightBtn,
                                    styles.backRightBtnRight,
                                ]}
                                onPress={() => {
                                    Alert.alert(
                                        languageSet.confirm_delete[language],
                                        '',
                                        [
                                            {
                                                text:
                                                    languageSet.cancel[
                                                        language
                                                    ],
                                                onPress: () =>
                                                    console.log(item._id),
                                                style: 'cancel',
                                            },
                                            {
                                                text:
                                                    languageSet.confirm[
                                                        language
                                                    ],
                                                onPress: () => {
                                                    //console.log(item._id);
                                                    deleteCompany(item._id);
                                                },
                                                style: 'destructive',
                                            },
                                        ]
                                    );
                                }}
                            >
                                <Text style={styles.backTextWhite}>
                                    {languageSet.delete[language]}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    disableRightSwipe={true}
                    rightOpenValue={-150}
                    directionalDistanceChangeThreshold={4}
                    swipeToOpenPercent={70}
                    stopRightSwipe={-150}
                    ListHeaderComponent={SearchBar}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            if (rowMap[rowKey]) rowMap[rowKey].closeRow();
                        }, 3000);
                    }}
                />
            </View>
        </View>
    );
};

const languageSet = {
    rename: ['Rename', '重命名'],
    confirm_delete: ['Confirm Delete?', '确认删除？'],
    cancel: ['Cancel', '取消'],
    confirm: ['Confirm', '确认'],
    delete: ['Delete', '删除'],
    title: ['HuaLong Testing App', '华龙专用内测APP'],
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: Color.secondaryColor,
    },
    cardContainer: {
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 0,
    },
    entry: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 2,
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 0,
        borderRadius: 6,
        height: 60,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        borderRadius: 6,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
        borderRadius: 6,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderRadius: 6,
    },
    backTextWhite: {
        color: '#FFF',
    },
});

MainScreen.navigationOptions = ({ navigation }) => ({
    title: languageSet.title[language],
    headerRight: () => (
        <Ionicons
            style={{ paddingRight: 20 }}
            name='ios-add'
            size={32}
            color='white'
            onPress={() => navigation.navigate('CompanyModal')}
        />
    ),
});

export default MainScreen;
