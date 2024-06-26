import { Tables } from "../lib/db.types";
import { REST_BPM_MULTIPLIER } from "./constants";

/**
 * The energy score weights for each feature of a song
 * The higher the weight, the more important the feature is
 * to the overall score of the song, which is used to calculate
 * the music queue
 * WEIGHTS: range from [0, 10]
 */
const ENERGY_SCORE_WEIGHTS = {
  /**
   * A value of 0.0 is least danceable and 1.0 is most danceable.
   */
  danceability: 2.5,
  /**
   * Energy is a measure from 0.0 to 1.0 and represents a perceptual
   * measure of intensity and activity
   */
  energy: 7.5,
  /**
   * Values typically range between -60 and 0 db
   */
  loudness: (num: number) => {
    // convert loudness to a value between 0 and 1 and multiply by weight
    return ((num + 60) / 60) * 1.5;
  },
  /**
   * Values above 0.66 describe tracks that are probably made entirely of spoken words.
   * Values between 0.33 and 0.66 describe tracks that may contain both music and speech,
   * either in sections or layered, including such cases as rap music.
   * Values below 0.33 most likely represent music and other non-speech-like tracks.
   */
  speechiness: (num: number) => {
    // we want to invert the value so that higher speechiness is less desirable
    return (1 - num) * 2.5;
  },
  /**
   * A confidence measure from 0.0 to 1.0 of whether the track is acoustic.
   * 1.0 represents high confidence the track is acoustic.
   */
  acousticness: 0.25,
  /**
   * Values above 0.5 are intended to represent instrumental tracks,
   * but confidence is higher as the value approaches 1.0.
   */
  instrumentalness: 2.5,
  /**
   * A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.
   * Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric),
   * while tracks with low valence sound more negative (e.g. sad, depressed, angry)
   */
  valence: 7.5,
  /**
   * The overall estimated tempo of a track in beats per minute (BPM)
   */
  tempo: (num: number) => {
    // convert tempo to a value between 0 and 1 and multiply by weight
    return (num / 100) * 25;
  },
};

const INTERVAL_DURATION_MIN = 150;

export const calculateSongQueue = (params: {
  intervals: (Tables<"workout_intervals"> & {
    workout_intensities: Tables<"workout_intensities">;
  })[];
  numberOfSets: number;
  songs: Tables<"songs">[];
}) => {
  const { intervals: rawIntervals, numberOfSets, songs: rawSongs } = params;
  const intervals: {
    tempo: number;
    duration: number;
  }[] = [];

  // create an array of intervals based on the number of sets
  for (let i = 0; i < numberOfSets; i++) {
    rawIntervals.forEach((interval) => {
      // split the interval into active and rest intervals
      intervals.push({
        tempo: Math.floor(
          (interval.workout_intensities.bpm_lower_threshold +
            interval.workout_intensities.bpm_upper_threshold) /
            2
        ),
        duration: interval.active,
      });

      intervals.push({
        tempo: Math.round(
          ((interval.workout_intensities.bpm_lower_threshold +
            interval.workout_intensities.bpm_upper_threshold) /
            2) *
            REST_BPM_MULTIPLIER
        ),
        duration: interval.rest,
      });
    });
  }

  // calculate the score for each song and sort by score
  let songs = getNewSongsArray(rawSongs);

  // create a queue of songs based on the intervals
  const queue: Tables<"songs">[] = [];

  // per interval, based on the interval's tempo, add a song to the queue
  // that has the most similar energy score + also has similar tempo + duration
  let intervalIndex = 0;
  let songOverlap = 0;

  while (intervalIndex < intervals.length) {
    const interval = intervals[intervalIndex];
    intervalIndex++;

    /**
     * Calculate the desired tempo for an interval or group of intervals at least 150 sec long
     */
    const { desiredTempo, intervalDuration } = (() => {
      const { tempo, duration } = interval;

      let groupDuration = duration - songOverlap;
      let groupIntervals = [
        {
          tempo,
          duration: duration - songOverlap,
        },
      ];

      // if the interval duration is under 150 seconds, we want to also include details of next intervals until min time hit
      while (
        groupDuration < INTERVAL_DURATION_MIN &&
        intervalIndex < intervals.length - 1
      ) {
        const nextInterval = intervals[intervalIndex];
        groupDuration += nextInterval.duration;
        groupIntervals.push({
          tempo: nextInterval.tempo,
          duration: nextInterval.duration,
        });

        intervalIndex++;
      }

      // combine group of intervals into weighted tempo and duration
      const weightedTempo = groupIntervals.reduce((acc, val) => {
        return acc + Math.round(val.tempo * (val.duration / groupDuration));
      }, 0);

      console.log(
        "groupIntervals",
        groupIntervals.map(
          (i) => `tempo: ${i.tempo} | duration: ${i.duration}`
        ),
        weightedTempo
      );

      return {
        intervalDuration: groupDuration,
        desiredTempo: weightedTempo,
      };
    })();

    if (intervalDuration === -1 || desiredTempo === -1) {
      continue;
    }

    // keep track of all scores
    let { songsWithScores, summedScores } = getNewSongWithScores({
      songs,
      desiredTempo,
    });

    // choose songs that have total length of min(intervalDuration)
    let songsDuration = 0;
    const addedSongs: (Tables<"songs"> & { totalScore: number })[] = [];

    while (songsDuration < intervalDuration) {
      // randomly choose songs with weighted probability based on their scores
      const scoreToSelect = Math.round(Math.random() * summedScores);

      let currentScore = 0;
      let songIndex = 0;

      while (
        songIndex < songsWithScores.length &&
        currentScore + songsWithScores[songIndex].totalScore < scoreToSelect
      ) {
        currentScore += songsWithScores[songIndex].totalScore;
        songIndex++;
      }

      if (songIndex === songsWithScores.length) {
        songIndex--;
      }

      // remove the song from the list of songs
      const songToAdd = (() => {
        if (queue.length === 0) {
          return songsWithScores.splice(songIndex, 1)[0];
        } else {
          const pastSong = queue[queue.length - 1];
          if (
            pastSong.apple_music_id ===
            songsWithScores[songIndex].apple_music_id
          ) {
            return songsWithScores.splice(songIndex - 1, 1)[0];
          } else {
            return songsWithScores.splice(songIndex, 1)[0];
          }
        }
      })();
      songs = songs.filter(
        (song) => song.apple_music_id !== songToAdd.apple_music_id
      );

      // reset song arrays if needed
      if (songs.length === 0) {
        songs = getNewSongsArray(rawSongs);
      }

      if (songsWithScores.length === 0) {
        songsWithScores = getNewSongWithScores({
          songs,
          desiredTempo,
        }).songsWithScores;
      }

      queue.push(songToAdd);
      addedSongs.push(songToAdd);
      songsDuration += Math.round(songToAdd.duration_ms / 1000);
    }

    // calculate the overlap of the last song
    songOverlap = songsDuration - intervalDuration;

    // skip intervals that arent as long as songOverlap
    while (
      intervalIndex < intervals.length &&
      songOverlap >= intervals[intervalIndex].duration
    ) {
      songOverlap -= intervals[intervalIndex].duration;
      intervalIndex++;
    }
  }

  return queue;
};

const getNewSongsArray = (songs: Tables<"songs">[]) => {
  return songs.map((song) => {
    return {
      ...song,
      energyScore: calculateEnergyScore(song),
    };
  });
};

const calculateTempoScore = (desiredTempo: number, actualTempo: number) => {
  // Calculate the absolute difference in tempo
  const tempoDifference = Math.abs(desiredTempo - actualTempo);

  // Define the maximum difference considered for scoring (e.g., a difference of 200 beats)
  const maxDifference = 200;

  // Normalize the difference to a scale of 0 to 1, where 0 means no difference and 1 means maximum difference considered
  const normalizedDifference = Math.min(tempoDifference / maxDifference, 1);

  // Use an exponential decay function to calculate the score
  // Adjust the exponent base (e.g., 0.5) to control how quickly the score decreases
  // The base of the exponent determines the shape of the decay curve
  const score = Math.pow(1 - normalizedDifference, 2) * 100;

  // Ensure the score is within the bounds [0, 100]
  return Math.max(0, Math.min(score, 100));
};

const getNewSongWithScores = (params: {
  songs: (Tables<"songs"> & { energyScore: number })[];
  desiredTempo: number;
}) => {
  const { songs, desiredTempo } = params;
  let summedScores = 0;

  const songsWithScores = songs
    .map((song) => {
      // want scores to be [0, 100]
      const tempoScore = calculateTempoScore(desiredTempo, song.tempo);
      // 100 -
      // Math.round((Math.abs(desiredTempo - song.tempo) / desiredTempo) * 100);
      const totalScore = song.energyScore * 3 + tempoScore;
      summedScores += totalScore;

      return {
        ...song,
        tempoScore,
        totalScore,
      };
    })
    .sort((a, b) => b.totalScore - a.totalScore);

  console.log(
    "for desiredTempo",
    desiredTempo,
    "songsWithScores",
    songsWithScores.map(
      (s) => `${s.title} has tempo = ${s.tempo} | totalScore = ${s.totalScore} `
    )
  );

  return {
    songsWithScores,
    summedScores,
  };
};

const calculateEnergyScore = (song: Tables<"songs">) => {
  // need to calculate the queue based on audio features
  return Object.keys(ENERGY_SCORE_WEIGHTS).reduce((acc, key) => {
    // if the feature weight is a function, call it with the value of the song
    const newScore =
      typeof ENERGY_SCORE_WEIGHTS[key] === "function"
        ? (ENERGY_SCORE_WEIGHTS[key](song[key]) as number)
        : song[key] * ENERGY_SCORE_WEIGHTS[key];
    return acc + newScore;
  }, 0);
};

// FOR TESTING
// (async () => {
//   const { data: songs } = await supabase.from("songs").select("*");

//   if (!songs) {
//     console.error("No songs found");
//     return;
//   }

//   const queue = calculateSongQueue({
//     intervals: FAKE_INTERVALS,
//     songs: songs,
//   });

//   console.log("queue", queue);
// })();
