import { 
    Text,
    View,
    StyleSheet
} from 'react-native'
import { Avatar } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  userImage: {
    marginRight: 12,
  },
  userText: {
    color: "#172A3A",
  }
})

const Friend = ({
    containerStyle,
    avatar,
    name,
  }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.userImage}>
                <Avatar
                rounded
                size="medium"
                source={{
                    uri: avatar,
                }}
                />
            </View>
            <Text styles={styles.userText}>{name}</Text>
        </View>
    )
  }

export default Friend