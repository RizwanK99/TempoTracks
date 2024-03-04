import 'react-native-url-polyfill/auto'
import { createClient } from "@supabase/supabase-js";
import { saved_user_data } from './Globals';

const supabase = createClient("https://kbgiqwyohojnejjlkwae.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtiZ2lxd3lvaG9qbmVqamxrd2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NzQyOTMsImV4cCI6MjAwMjI1MDI5M30.FSCqDJdjvsbpwNp2IJr1LFjtnUkXI-gzwKjJnrkc8JM");

async function signUpNewUser(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (data) {
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
  const payload = {
    user_id: user_id,
    first_name: firstName,
    last_name: lastName,
    username: username,
    email: email,
    phone_number: phoneNumber,
  };

  const result = await supabase.from('users').insert(payload).select().single();
  console.log(result);
  return result.data;
}

async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
  return data.user?.id;
}

async function userLogIn(email, password) {
  const user_id = await signInWithEmail(email, password);

  if (!user_id) {
    return null;
  }

  const result = await supabase.from('users').select().eq('user_id', user_id).single();
  console.log(result);

  const user_data = {
    user_id: result.data.user_id,
    first_name: result.data.first_name,
    last_name: result.data.last_name,
    username: result.data.username,
    email: result.data.email,
    phone_number: result.data.phone_number,
    daily_distance_goal: result.data.daily_distance,
    daily_calorie_goal: result.data.daily_calories,
    daily_duration_goal: result.data.daily_duration,
    monthly_distance_goal: result.data.monthly_distance,
    monthly_calorie_goal: result.data.monthly_calories,
    monthly_duration_goal: result.data.monthly_duration,
    monthly_workouts_goal: result.data.monthly_workouts,
  }

  saved_user_data.user_id = user_data.user_id;
  saved_user_data.first_name = user_data.first_name;
  saved_user_data.last_name = user_data.last_name;
  saved_user_data.username = user_data.username;
  saved_user_data.email = user_data.email;
  saved_user_data.phone_number = user_data.phone_number;
  saved_user_data.daily_distance_goal = user_data.daily_distance_goal;
  saved_user_data.daily_calorie_goal = user_data.daily_calorie_goal;
  saved_user_data.daily_duration_goal = user_data.daily_duration_goal;
  saved_user_data.monthly_distance_goal = user_data.monthly_distance_goal;
  saved_user_data.monthly_calorie_goal = user_data.monthly_calorie_goal;
  saved_user_data.monthly_duration_goal = user_data.monthly_duration_goal;
  saved_user_data.monthly_workouts_goal = user_data.monthly_workouts_goal;

  return user_data;
}

async function updateDailyGoals(
  user_id,
  daily_distance,
  daily_calories,
  daily_duration
) {
  const result = await supabase.from('users').update({
    daily_distance: daily_distance,
    daily_calories: daily_calories,
    daily_duration: daily_duration,
  }).eq('user_id', user_id).single();
  console.log(result);
  return result.data;
}

async function updateBodyStats(user_id, height, weight, age) {
  const result = await supabase.from('users').update({
    height: height,
    weight: weight,
    age: age,
  }).eq('user_id', user_id).single();
  console.log(result);
  return result.data;
}

async function updateMonthlyGoals(user_id, monthly_distance, monthly_calories, monthly_duration, monthly_workouts) {
  const result = await supabase.from('users').update({
    monthly_distance: monthly_distance,
    monthly_calories: monthly_calories,
    monthly_duration: monthly_duration,
    monthly_workouts: monthly_workouts,
  }).eq('user_id', user_id).single();
  console.log(result);
  return result.data;
}

export { createUser, userLogIn, updateDailyGoals, updateMonthlyGoals, updateBodyStats };
