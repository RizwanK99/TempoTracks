async function createPlaylist() {
    //edit the payload data to match the data you want to send
    const payload = {
        user_id: 16,
        workout_name: "test",
        workout_type: "cardio",
        workout_name: "Garrick's Workout"
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

     let ret = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-playlist', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),

    
    });
    console.log(ret);
}

async function deletePlaylist(playlist_id) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

     let ret = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/delete-playlist', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            playlist_id: playlist_id,
        }),

    
    });
    console.log(ret);
}

export { createPlaylist, deletePlaylist };