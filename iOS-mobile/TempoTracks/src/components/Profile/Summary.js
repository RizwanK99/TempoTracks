import { 
    Text,
    View,
    StyleSheet 
} from 'react-native'


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

const Summary = ({
    containerStyle = {},
  }) => {
    return (
        <View
            contentContainerStyle={[styles.container, containerStyle]}
        >
            <Text>Total Calories Burned:</Text>
            <Text>Total Distance Travelled:</Text>
            <Text>Workout Streak:</Text>
        </View>
    )
  }

export default Summary