import { FlatList, StyleSheet } from 'react-native'

import Post from './Post'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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

const Feed = ({
    containerStyle = {},
    feed
  }) => {
    return (
      <FlatList
        scrollEnabled={false}
        removeClippedSubviews={false}
        contentContainerStyle={[styles.container, containerStyle]}
        data={feed}
        renderItem={list => {
          return (
            <Post
              key={`post-${list.item.id}`}
              containerStyle={styles.postContainer}
              {...list.item}
            />
          )
        }}
      />
    )
  }

export default Feed