async function createWorkout() {
    const payload = {
        user_id: 16,
        workout_name: "test",
        workout_type: "cardio",
        workout_name: "Garrick's Workout"
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

     let ret = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-workout', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),

    
    });
    console.log(ret);
}

function deleteWorkout(workout_id) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/delete-workout', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            workout_id: workout_id,
        }),
    });

}

function getUsersWorkouts(user_id) {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/get-all-workouts', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            user_id: user_id,
        }),
    });
}

export { createWorkout, deleteWorkout, getUsersWorkouts };
