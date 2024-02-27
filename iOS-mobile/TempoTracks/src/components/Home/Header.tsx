import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Appbar, Avatar } from 'react-native-paper';
import { endOfDay, format, set } from 'date-fns';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppTheme } from '../../provider/PaperProvider'

export const HomePageHeader = ({ navigation }) => {
    const theme = useAppTheme();
    const formattedDate = format(endOfDay(new Date()), 'MMMM d, yyyy');
    const [user, setUser] = useState({});

    useEffect(() => {
        async function fetchData() {
            const value = await AsyncStorage.getItem("user_data");
            if (value !== null) {
                setUser(JSON.parse(value));
            }
        }
        fetchData();
    }, []);

    return (
        <Appbar.Header mode="small" statusBarHeight={0} elevated style={{ backgroundColor: theme.colors.background, paddingBottom: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <View>
                    <Appbar.Content title={formattedDate.toUpperCase()} titleStyle={{ fontSize: 14 }} />
                    {user.name && <Appbar.Content title={"Good Afternoon, " + user.name.split(' ')[0]} titleStyle={{ fontSize: 25 }} />}
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Profile', { ...user })}>
                    <Avatar.Text size={40} label={user.name ? user.name[0] : ''} />
                </TouchableOpacity>
            </View>
        </Appbar.Header>
    );
};