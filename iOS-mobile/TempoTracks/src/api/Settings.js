async function updateSettings(dataStream, fade, mix, explicitContent, peakNormalize, bpmWarning) {
    console.log('In api settings call')
    
    const payload = {
        data_saver: dataStream,
        crossfade: fade,
        auto_mix: mix,
        explicit_content: explicitContent,
        bpm_normalization: peakNormalize,
        high_bpm_warning: bpmWarning
    }

    console.log(payload)

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/update-settings', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),
    })
}

async function getSettings() {
    console.log('In api settings call')
    
    const payload = {
        data_saver: dataStream,
        crossfade: fade,
        auto_mix: mix,
        explicit_content: explicitContent,
        bpm_normalization: peakNormalize,
        high_bpm_warning: bpmWarning
    }

    console.log(payload)

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/get-settings', {
        method: 'GET',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),
    })
}

export default getSettings