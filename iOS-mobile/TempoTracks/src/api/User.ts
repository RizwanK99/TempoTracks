import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";

// TODO: this should actually use supabase client and be strongly typed
const supabase = createClient("https://kbgiqwyohojnejjlkwae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZ2lxd3lvaG9qbmVqamxrd2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NzQyOTMsImV4cCI6MjAwMjI1MDI5M30.FSCqDJdjvsbpwNp2IJr1LFjtnUkXI-gzwKjJnrkc8JM");

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  console.log(error)

  if (data){
    console.log("from auth")
    console.log(data.user?.id)
    return data.user?.id
  }
}

async function createUser(
  username,
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) {

  let user_id = await signUpNewUser(email, password);
  console.log("pub " + user_id)
  const payload = {
    user_id: user_id,
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    phone_number: phoneNumber,
  };

  const result = await supabase.from('users').insert(payload).select().single();

  console.log("from create user")
  console.log(result);
  return result.data;
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })

  console.log("from auth")
  console.log(data)
  console.log(error)
  return data.user?.id;
}

async function userLogIn(email, password) {

  console.log("sign in user")
  console.log(email + " " + password)

  const user_id = await signInWithEmail(email, password);

  console.log("user id")
  console.log(user_id)

  if (!user_id) {
    return null;
  }

  const result = await supabase.from('users').select().eq('user_id', user_id).single();

  console.log("sign in user")
  console.log(result);



  const user_data = {
    user_id: result.data.user_id,
    first_name: result.data.first_name,
    last_name: result.data.last_name,
    username: result.data.username,
    email: result.data.email,
    phone_number: result.data.phone_number,
  }

  return user_data;

}

export { createUser, userLogIn };
