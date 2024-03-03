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
      const bpm = Math.round(
        (interval.workout_intensities.bpm_lower_threshold +
          interval.workout_intensities.bpm_upper_threshold) /
          2
      );

      // split the interval into active and rest intervals
      intervals.push({
        value: mapBpmToPlaybackRate(bpm, false),
        duration: interval.active * 1000, // turn into ms
      });

      intervals.push({
        value: mapBpmToPlaybackRate(
          Math.round(bpm * REST_BPM_MULTIPLIER),
          true
        ),
        duration: interval.rest * 1000, // turn into ms
      });
    });
  }

  return intervals;
};

export const mapBpmToPlaybackRate = (bpm: number, isRest: boolean) => {
  // clamp bpm to [60, 170]
  bpm = Math.max(60, Math.min(170, bpm));

  // want to map so that 60 pm is ~0.85
  // and then 170 bpm is ~1.15
  // and then 110 bpm is ~1

  // y = mx + b
  if (isRest) {
    const m = (1.15 - 0.85) / (170 - 60);
    return Math.round((m * (bpm - 60) + 0.85) * 100) / 100;
  } else {
    // if not rest, the playback rate should always be > 1
    const m = (1.25 - 1) / (170 - 60);
    return Math.round((m * (bpm - 60) + 1) * 100) / 100;
  }
};
