import React, { useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Icon } from 'react-native-elements'
import {
  TabView,
  TabBar,
} from 'react-native-tab-view'

import Feed from '../components/Profile/Feed';
import Summary from '../components/Profile/Summary';
import FriendsList from '../components/Profile/FriendsList';

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginTop: 45,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  indicatorTab: {
    backgroundColor: "#004346",
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  sceneContainer: {
    marginTop: 10,
    marginLeft: 20,
  },
  socialIcon: {
    marginLeft: 14,
    marginRight: 14,
  },
  socialRow: {
    flexDirection: 'row',
  },
  tabBar: {
    backgroundColor: '#EEE',
  },
  tabContainer: {
    flex: 1,
  },
  tabLabelNumber: {
    color: '#172A3A',
    fontSize: 12.5,
    textAlign: 'center',
  },
  userBioRow: {
    marginLeft: 40,
    marginRight: 40,
  },
  userBioText: {
    color: '#172A3A',
    fontSize: 13.5,
    textAlign: 'center',
  },
  userImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: 10,
    width: 120,
  },
  userNameRow: {
    marginBottom: 10,
  },
  userNameText: {
    color: '#172A3A',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 12,
  },
  btn_box: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 30,
    alignContent: "center",
  },
  btn_shape: {
    backgroundColor: "#09bc8a",
    borderRadius: 10,
    width: "50%",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
  },
  btn_text: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
})

const ProfilePage = ({route, navigation}) => {
    const {avatar, name, bio, feed, friends, summary, containerStyle = {}, tabContainerStyle = {}} = route.params;
    const [tabs, setTabs] = useState({
        index: 0,
        routes: [
            { key: '1', title: 'Summary' },
            { key: '2', title: 'Feed' },
            { key: '3', title: 'Friends' },
        ],
    });

    const handleIndexChange = index => {
        setTabs(prevTabs => ({
            ...prevTabs,
            index,
        }));
    }

    const renderTabBar = props => {
        return <TabBar
            indicatorStyle={styles.indicatorTab}
            renderLabel={renderLabel(props)}
            pressOpacity={0.8}
            style={styles.tabBar}
            {...props}
        />
    };

    const renderLabel = props => ({ route }) => {
        const routes = props.navigationState.routes;

        let labels = [];
        routes.forEach((e, index) => {
            labels.push(index === props.navigationState.index ? 'black' : 'gray')
        });

        const currentIndex = parseInt(route.key) - 1;
        const color = labels[currentIndex];

        return (
            <View>
            <Animated.Text style={[styles.tabLabelText, { color }]}>
                {route.count}
            </Animated.Text>
            <Animated.Text style={[styles.tabLabelNumber, { color }]}>
                {route.title}
            </Animated.Text>
            </View>
        );
    }

    const renderContactHeader = () => {
        return (
            <View style={styles.headerContainer}>
            <View style={styles.userRow}>
                <Image
                style={styles.userImage}
                source={{uri: avatar}}
                />
                <View style={styles.userNameRow}>
                    <Text style={styles.userNameText}>{name}</Text>
                </View>
                <View style={styles.userBioRow}>
                    <Text style={styles.userBioText}>{bio}</Text>
                </View>
            </View>
            <View style={styles.socialRow}>
                <View>
                <Icon
                    size={30}
                    type="entypo"
                    color="#3B5A98"
                    name="facebook-with-circle"
                    onPress={() => console.log('facebook')}
                />
                </View>
                <View style={styles.socialIcon}>
                <Icon
                    size={30}
                    type="entypo"
                    color="#56ACEE"
                    name="twitter-with-circle"
                    onPress={() => console.log('twitter')}
                />
                </View>
                <View>
                <Icon
                    size={30}
                    type="entypo"
                    color="#DD4C39"
                    name="google--with-circle"
                    onPress={() => console.log('google')}
                />
                </View>
            </View>
            </View>
        )
    }

    const renderScene = ({ route: { key } }) => {
        switch (key) {
            case '1':
                return <Summary summary={summary}/>
            case '2':
                return <Feed containerStyle={styles.sceneContainer} feed={feed} />
            case '3':
                return <FriendsList containerStyle={styles.sceneContainer} friends={friends}/>;
            default:
                return <View />;
        }
    }

    return (
        <ScrollView style={styles.scroll}>
            <View style={[styles.container, containerStyle]}>
                <View style={styles.cardContainer}>
                    {renderContactHeader()}
                    <TabView
                        style={[styles.tabContainer, tabContainerStyle]}
                        navigationState={tabs}
                        renderScene={renderScene}
                        renderTabBar={renderTabBar}
                        onIndexChange={handleIndexChange}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        style={[styles.btn_shape, { marginHorizontal: 10 }]}
                    >
                        <Text style={styles.btn_text}>Back To Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default ProfilePage;