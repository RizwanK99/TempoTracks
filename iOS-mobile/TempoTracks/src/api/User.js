async function createUser(username, firstName, lastName, email, phoneNumber, password) {

    const payload = {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        phone_number: phoneNumber,
        password: password
    }

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),


    });

    const data = await response.json();
    console.log(data);
    return data;
}

async function userLogIn (username, password) {
    const payload = {
        username: username,
        password: password
    }
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    let response = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),


    });
    const data = await response.json();
    console.log(data);
    return data;
}

export { createUser, userLogIn };