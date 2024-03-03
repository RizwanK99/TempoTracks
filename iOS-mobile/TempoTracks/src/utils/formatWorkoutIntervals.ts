import { Tables } from "../lib/db.types";
import { REST_BPM_MULTIPLIER } from "./constants";

export const formatWorkoutIntervals = (params: {
  rawIntervals: (Tables<"workout_intervals"> & {
    workout_intensities: Tables<"workout_intensities">;
  })[];
  numberOfSets: number;
}) => {
  const { numberOfSets, rawIntervals } = params;

  const intervals: {
    value: number;
    duration: number;
  }[] = [];

  // create an array of intervals based on the number of sets
  for (let i = 0; i < numberOfSets; i++) {
    rawIntervals.forEach((interval) => {
      // split the interval into active and rest intervals
      intervals.push({
        value: Math.floor(
          (interval.workout_intensities.bpm_lower_threshold +
            interval.workout_intensities.bpm_upper_threshold) /
            2
        ),
        duration: interval.active * 1000, // turn into ms
      });

      intervals.push({
        value: Math.round(
          ((interval.workout_intensities.bpm_lower_threshold +
            interval.workout_intensities.bpm_upper_threshold) /
            2) *
            REST_BPM_MULTIPLIER
        ),
        duration: interval.rest * 1000, // turn into ms
      });
    });
  }

  return intervals;
};
