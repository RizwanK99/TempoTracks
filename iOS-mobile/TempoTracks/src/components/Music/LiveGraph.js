import { useState, useEffect, useRef } from 'react';
import {
  Dimensions,
  Text,
  View
} from 'react-native';
import {
  LineChart,
} from "react-native-chart-kit";
import { PLAYBACK_TEST_DATA } from './testData';

const GRAPH_DATA_LENGTH = 10

const LiveGraph = ({ isPlaying, playbackRate, handlePlaybackRateChange }) => {
  const [playbackDataIndex, setPlaybackDataIndex] = useState(0)
  const [graphData, setGraphData] = useState(new Array(GRAPH_DATA_LENGTH).fill(1))

  const updateGraph = () => {
    setGraphData(graphData => {
      
      if (playbackDataIndex + 1 >= PLAYBACK_TEST_DATA.length) {
        setPlaybackDataIndex(0)
      } else {
        setPlaybackDataIndex(playbackDataIndex + 1)
      }

      if (isPlaying) {
        handlePlaybackRateChange(graphData[0])
      }
      return [...graphData.slice(1), PLAYBACK_TEST_DATA[(playbackDataIndex + GRAPH_DATA_LENGTH - 1) % PLAYBACK_TEST_DATA.length]]
    })
  }

  useInterval(() => {
    updateGraph()
  }, 125);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     updateGraph()
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <View style={{ backgroundColor: 'black' }}>
      <Text style={{ color: 'white' }}>Workout Tempo: {playbackRate}</Text>
      <LineChart
        data={{
          datasets: [
            {
              data: graphData
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        // yAxisLabel="Tempo"
        // yAxisSuffix="k"
        // yAxisInterval={1} // optional, defaults to 1
        withHorizontalLabels={false}
        withInnerLines={false}
        withOuterLines={false}
        withDots={false}
        chartConfig={{
          // backgroundColor: "#e26a00",
          // backgroundGradientFrom: "#fb8c00",
          // backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `#09BC8A`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#09BC8A"
          }
        }}
        
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  )
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

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
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default LiveGraph