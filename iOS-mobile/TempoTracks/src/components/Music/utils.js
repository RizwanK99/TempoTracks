export const TIME_STEP = 50
export const TIME_STEP_SECONDS = TIME_STEP / 1000

export const getNextExerciseState = (workout, currentExerciseState, currentTime) => {
  // get initial state if exercise index == -1
  if (currentExerciseState.exerciseIndex === -1) {
    return {
      currentTempo: 1,
      exerciseIndex: 0,
      setIndex: 0,
      isResting: false,
      timeStartedSet: currentTime,
      timeLeftInSet: workout.exercises[0].duration,
      completed: false
    }
  }

  const exercise = workout.exercises[currentExerciseState.exerciseIndex]

  const isExercising = !currentExerciseState.isResting

  if (isExercising) {
    // if exercising, check if we need to rest
    if (currentExerciseState.timeLeftInSet <= 0) {
      // done exercise, move to rest
      // check if we need to move to the next set/exercise ONLY IF NOT RESTING
      if (currentExerciseState.setIndex + 1 >= exercise.sets && exercise.rest === -1) {
        // if we need to move to the next set, check if we need to move to the next exercise
        if (currentExerciseState.exerciseIndex + 1 >= workout.exercises.length) {
          // if no more exercises, workout is complete
          console.log('workout complete')
          return {
            currentTempo: 1,
            exerciseIndex: -1, 
            setIndex: -1, 
            isResting: false, 
            timeStartedSet: -1,
            timeLeftInSet: -1,
            completed: true
          }
        } else {
          // move on to the next exercise
          console.log('moving to next exercise')
          const nextExercise = workout.exercises[currentExerciseState.exerciseIndex + 1]
          return {
            currentTempo: nextExercise.tempo,
            exerciseIndex: currentExerciseState.exerciseIndex + 1,
            setIndex: 0,
            isResting: false,
            timeStartedSet: currentTime,
            timeLeftInSet: nextExercise.duration,
            completed: false
          }
        }
      } else {
        // resting between sets
        console.log('resting between sets')
        return {
          ...currentExerciseState,
          isResting: true,
          timeStartedSet: currentTime,
          timeLeftInSet: exercise.rest,
          currentTempo: exercise.restTempo
        }
      }
    } else {
      // if we don't need to rest, keep exercising
      console.log('keep exercising')
      return {
        ...currentExerciseState,
        timeLeftInSet: currentExerciseState.timeLeftInSet - TIME_STEP_SECONDS,
        currentTempo: exercise.tempo
      }
    }
  } else {
    // if resting, check if we need to exercise
    if (currentExerciseState.timeLeftInSet <= 0) {
      // if we need to stop resting, move to next set/exercise
      if (currentExerciseState.setIndex + 1 >= exercise.sets) {
        // need to move to next exercise
        if (currentExerciseState.exerciseIndex + 1 >= workout.exercises.length) {
          // if no more exercises, workout is complete
          console.log('workout complete after rest')
          return {
            currentTempo: 1,
            exerciseIndex: -1,
            setIndex: -1,
            isResting: false,
            timeStartedSet: -1,
            timeLeftInSet: -1,
            completed: true
          }
        } else {
          // move to next workout
          console.log('moving to next exercise after rest')
          const nextExercise = workout.exercises[currentExerciseState.exerciseIndex + 1]
          return {
            currentTempo: nextExercise.tempo,
            exerciseIndex: currentExerciseState.exerciseIndex + 1,
            setIndex: 0,
            isResting: false,
            timeStartedSet: currentTime,
            timeLeftInSet: nextExercise.duration,
            completed: false
          }
        }
      } else {
        // get ready for next set
        console.log('getting ready for next set', currentExerciseState.isResting)
        return {
          ...currentExerciseState,
          isResting: false,
          setIndex: currentExerciseState.setIndex + 1,
          timeStartedSet: currentTime,
          timeLeftInSet: exercise.duration,
          currentTempo: exercise.tempo
        }
      }
    } else {
      // if we don't need to exercise, keep resting
      console.log('keep resting')
      return {
        ...currentExerciseState,
        timeLeftInSet: currentExerciseState.timeLeftInSet - TIME_STEP_SECONDS,
        currentTempo: exercise.restTempo,
      }
    }
  }
}

export const getTempo = (workout, currentExerciseState) => {
  if (currentExerciseState.isResting) {
    return workout.exercises[currentExerciseState.exerciseIndex].restTempo
  } else {
    return workout.exercises[currentExerciseState.exerciseIndex].tempo
  }
}