export interface workoutModel {
    workout_id: string,
    created_at: Date,
    status: string
    time_start: Date,
    time_end: Date,
    time_duration: number,
    workout_type: string,
    playlist_id: string,
    workout_name: string
}