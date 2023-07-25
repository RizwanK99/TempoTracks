import { 
  FlatList,
  StyleSheet
} from 'react-native'
import Friend from './Friend.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  userImage: {
    marginRight: 12,
  },
  userText: {
    color: "#172A3A",
  },
  postContainer: {
    justifyContent: 'space-between',
    marginBottom: 5,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    padding: 0,
    borderWidth: 0,
  },
})

const FriendsList = ({
    friends,
    containerStyle = {},
  }) => {
    return (
      <FlatList
            scrollEnabled={false}
            removeClippedSubviews={false}
            contentContainerStyle={[styles.container, containerStyle]}
            data={friends}
            renderItem={list => {
            return (
                <Friend
                key={`friend-${list.item.id}`}
                containerStyle={styles.postContainer}
                {...list.item}
                />
            )
            }}
        />
        
    )
  }

export default FriendsList