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
  progress_title: {
    color: "#172A3A",
    marginTop: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  progress_value: {
    color: "#74B3CE",
    marginTop: 10,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  }
})

const Summary = ({
    summary,
    containerStyle = {},
  }) => {
    return (
        <View
            contentContainerStyle={[styles.container, containerStyle]}
        >
          <Text style={styles.progress_title}>Total Calories Burned</Text>
          <Text style={styles.progress_value}>{summary.calories_burned} kcals</Text>
          <Text style={styles.progress_title}>Total Distance Travelled</Text>
          <Text style={styles.progress_value}>{summary.distance_travelled} km</Text>
          <Text style={styles.progress_title}>Workout Streak</Text>
          <Text style={styles.progress_value}>{summary.workout_streak} days</Text>
        </View>
    )
  }

export default Summary