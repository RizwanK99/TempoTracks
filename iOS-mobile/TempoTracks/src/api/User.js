async function createUser(username, firstName, lastName, email, phoneNumber, password) {
    //edit the payload data to match the data you want to send
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

     let ret = await fetch('https://kbgiqwyohojnejjlkwae.supabase.co/functions/v1/create-user', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            payload: payload,
        }),

    
    });
    console.log(ret);
}

export { createUser };