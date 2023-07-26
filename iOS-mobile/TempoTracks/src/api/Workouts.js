import uuid from "react-native-uuid";
async function createWorkout(
    user_id,
    status,
    timeDuration,
    workoutType,
    totalDistance,
    trainingIntervals,
    workoutName,
    playlistId
) {
    console.log("user_id:", user_id);
    console.log("status:", status);
    console.log("timeDuration:", timeDuration);
    console.log("workoutType:", workoutType);
    console.log("totalDistance:", totalDistance);
    console.log("trainingIntervals:", trainingIntervals);
    console.log("workoutName:", workoutName);
    console.log("playlistId:", playlistId);

    const totalElevationChange = 0;
    const totalEnergyBurned = 0;
    const timeStart = 0;
    const timeEnd = timeStart + timeDuration;
    const payload = {
        user_id: user_id,
        status: status,
        // time_start: timeStart,
        // time_end: timeEnd,
        time_duration: timeDuration,
        workout_type: workoutType,
        total_distance: totalDistance,
        total_energy_burned: totalEnergyBurned,
        total_elevation_change: totalElevationChange,
        training_intervals: trainingIntervals,
        workout_name: workoutName,
        // playlist_id: playlistId,
    };

    console.log("payload:", payload);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch(
        "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-workout",
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                payload: payload,
            }),
        }
    );
    const data = await response.json();
    console.log(data);
}

async function deleteWorkout(workout_id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch(
        "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/delete-workout",
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                workout_id: workout_id,
            }),
        }
    );

    const data = await response.json();
    console.log(data);
}

async function getUsersWorkouts(user_id, status) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const payload = {
        user_id: user_id,
        status: status,
    };

    let response = await fetch(
        "https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/get-all-workouts",
        {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                payload: payload,
            }),
        }
    );

    const data = await response.json();

    if (data.error){
        return [];
    }
    
    console.log(data);
    return data;
}

export { createWorkout, deleteWorkout, getUsersWorkouts };
