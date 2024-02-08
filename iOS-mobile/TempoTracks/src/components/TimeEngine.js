import React from "react";
import useTimeEngine from "../hooks/useTimeEngine";

const TimeEngine = () => {
  //Control pausing, stopping and starting here
  const { workout_id, status, time_start, time_end, time_duration, setPause} = useTimeEngine();

  setPause = () => {

  }

  getCurrentSong = () => {

  }

  getTimeLeft = () => {

  }


};

export default TimeEngine;