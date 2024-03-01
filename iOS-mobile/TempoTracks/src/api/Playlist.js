async function createPlaylist() {
    //edit the payload data to match the data you want to send
    const payload = {
        user_id: "c51056f2-c58f-4994-99e0-32c36ef3758b",
        workout_name: "test",
        workout_type: "cardio",
        workout_name: "Garrick's Workout"
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

     let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-playlist', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),

    
    });
    const data = await response.json();
    console.log(data);
}

async function deletePlaylist(playlist_id) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

     let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/delete-playlist', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            playlist_id: playlist_id,
        }),

    
    });
    const data = await response.json();
    console.log(data);
}

export { createPlaylist, deletePlaylist };