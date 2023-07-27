export const PLAYBACK_TEST_DATA = [
  1, 1, 1, 1, 1,
  1.025, 1.05, 1.075, 1.1, 1.125, 1.15, 1.175, 1.2, 1.225, 1.25, 1.275, 1.3, 1.325, 1.35, 1.375, 1.4,
  1.425, 1.45, 1.475, 1.5, 1.5, 1.5, 1.5, 1.5, 1.475, 1.45, 1.425, 1.4, 1.375, 1.35, 1.325, 1.3,
  1.275, 1.25, 1.225, 1.2, 1.175, 1.15, 1.125, 1.1, 1.075, 1.05, 1.025, 
  1, 1, 1, 1, 1,
  0.975, 0.95, 0.925, 0.9, 0.875, 0.85, 0.825, 0.8, 0.775, 0.75, 0.725, 0.7, 0.675, 0.65, 0.625, 0.6,
  0.575, 0.5, 0.5, 0.5, 0.525, 0.55, 0.575, 0.6, 0.625, 0.65, 0.675, 0.7, 0.725, 0.75, 0.775, 0.8,
  0.825, 0.85, 0.875, 0.9, 0.925, 0.95, 0.975, 
]

export const HITT_TEST_DATA = {
  name: 'HITT',
  description: 'High Intensity Interval Training',
  exerciseResetTime: 30,
  exercises: [
    {
      name: 'Jumping Jacks',
      duration: 5,
      rest: 5,
      sets: 3,
      tempo: 1.25,
      restTempo: 0.75,
    },
    {
      name: 'Push Ups',
      duration: 10,
      rest: 5,
      sets: 3,
      tempo: 1.25,
      restTempo: 0.75,
    },
    {
      name: 'Squats',
      duration: 10,
      rest: 5,
      sets: 3,
      tempo: 1.25,
      restTempo: 0.75,
    },
    {
      name: 'Sit Ups',
      duration: 10,
      rest: 5,
      sets: 3,
      tempo: 1.25,
      restTempo: 0.75,
    }
  ]
}

export const RUN_TEST_DATA = {
  name: 'Run',
  description: 'Run for 30 minutes',
  exerciseResetTime: -1, // no rest between exercises
  exercises: [
    {
      name: 'Warmup',
      duration: 30,
      rest: -1, // no rest between sets
      sets: 1,
      tempo: 1.25,
      restTempo: 1,
    },
    {
      name: 'Run',
      duration: 60,
      rest: 15,
      sets: 3,
      tempo: 1.5,
      restTempo: 0.75,
    },
    {
      name: 'Cooldown',
      duration: 30,
      rest: -1, // no rest between sets
      set: 1,
      tempo: 0.8,
      restTempo: 1
    }
  ]
}