import { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  View
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { HITT_TEST_DATA, RUN_TEST_DATA } from './testData';
import { getNextExerciseState, TIME_STEP, TIME_STEP_SECONDS } from './utils';
import { Button, Divider, Text } from 'react-native-elements';

const GRAPH_DATA_LENGTH = 50
const INTIAL_EXERCISE_STATE = {
  currentTempo: 1,
  exerciseIndex: -1,
  setIndex: 0,
  isResting: false,
  timeStartedSet: GRAPH_DATA_LENGTH,
  timeLeftInSet: 0,
  completed: false
}
const INITIAL_EXERCISE_GRAPH = new Array(GRAPH_DATA_LENGTH).fill(INTIAL_EXERCISE_STATE)  

const LiveGraph = ({ isPlaying, playbackRate, handlePlaybackRateChange }) => {
  const [graphData, setGraphData] = useState(INITIAL_EXERCISE_GRAPH)

  const [workout, setWorkout] = useState(null)
  const [isExercising, setIsExercising] = useState(false)
  const [currentExerciseState, setCurrentExerciseState] = useState(INTIAL_EXERCISE_STATE)
  const [currentTime, setCurrentTime] = useState(0)

  const updateGraph = () => {
    if (workout && isPlaying) {
      setCurrentTime(curTime => curTime + TIME_STEP_SECONDS)
      const nextExerciseState = getNextExerciseState(workout, graphData.at(-1), currentTime)

      if (graphData[0].currentTempo !== currentExerciseState.currentTempo) {
        handlePlaybackRateChange(graphData[0].currentTempo)
      }
      setCurrentExerciseState(graphData[0])

      setGraphData(graphData => {
        return [...graphData.slice(1), nextExerciseState]
      })
    }
  }

  useInterval(() => {
    updateGraph()
  }, (isExercising && workout) ? TIME_STEP : null);

  const startWorkout = () => {
    setIsExercising(!isExercising)
    setGraphData(INITIAL_EXERCISE_GRAPH)
  }

  const stopWorkout = () => {
    setIsExercising(false)
    setWorkout(null)
    setCurrentExerciseState(INTIAL_EXERCISE_STATE)
    setGraphData(INITIAL_EXERCISE_GRAPH)
    setCurrentTime(0)
  }

  return (
    <View style={{}}>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
        { !workout ? (
          <>
            <Text style={{ color: 'white', textAlign: 'center', flexBasis: '100%' }} h3>Select Workout</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12, flexBasis: '100%' }}>
              <Button buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }} title="HITT Test" disabled={workout?.name === HITT_TEST_DATA.name} onPress={() => setWorkout(HITT_TEST_DATA)}/>
              <Button buttonStyle={{ backgroundColor: 'rgba(111, 202, 186, 1)' }} color="secondary" title="Run Test" disabled={workout?.name === RUN_TEST_DATA.name} onPress={() => setWorkout(RUN_TEST_DATA)}/>
            </View>
          </>
        ) :
        currentExerciseState.completed ? (
          <Text style={{ color: 'white', flex: 1, textAlign: 'center' }} h3>Completed Workout</Text>
        ) : (
          <>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Exercise: {currentExerciseState.exerciseIndex >= 0 ? HITT_TEST_DATA.exercises[currentExerciseState.exerciseIndex].name : "Starting Workout"}</Text>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Set: {currentExerciseState.setIndex + 1}</Text>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Is Resting: {currentExerciseState.isResting ? "Yes": "No"}</Text>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Current Tempo: {currentExerciseState.currentTempo}</Text>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Time in Set: {Math.ceil(currentExerciseState.timeLeftInSet)}</Text>
            <Text style={{ color: 'white', flexBasis: '50%' }}>Completed: {currentExerciseState.completed ? "Yes": "No"}</Text>
          </>
        )}
        
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} >
        <Button title="Start Workout" onPress={() => startWorkout()} disabled={!workout}/>
        <Button title="Stop Workout" onPress={() => stopWorkout()} disabled={!workout}/>
      </View>
      
      {/* <Divider style={{ backgroundColor: 'white', marginVertical: 10 }} /> */}

      {/* <Text style={{ color: 'white' }}>Playback Rate:</Text> */}

      <View style={{ marginLeft: -20, marginTop: 10 }}>
        <LineChart
          data={{
            datasets: [
              {
                data: graphData?.map(e => e.currentTempo) || [],
              },
              // Dummy data-points so that y-axis is fixed to [0.5, 1.5]
              {
                data: [0.5],
                color: () => 'transparent', 
                strokeWidth: 0, 
                withDots: false,
              },
              {
                data: [1.5],
                color: () => 'transparent', 
                strokeWidth: 0, 
                withDots: false,
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={180}
          fromZero={0.5}
          withInnerLines={false}
          withOuterLines={false}
          withDots={false}
          chartConfig={{
            backgroundGradientFrom: "#1E2923",
            backgroundGradientTo: "#08130D",
            backgroundGradientFromOpacity: 0.5,
            backgroundGradientToOpacity: 0.5,
            decimalPlaces: 3,
            color: (opacity = 1) => `#09BC8A`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={{
            borderRadius: 16
          }}
        />
      </View>
    </View>
  )
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();
  let intervalId = useRef(null)

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      intervalId.current = setInterval(tick, delay);
      return () => clearInterval(intervalId.current);
    }
  }, [delay]);

  return intervalId.current
}

export default LiveGraph