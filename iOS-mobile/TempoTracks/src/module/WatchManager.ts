import { NativeModules } from 'react-native';
import { useEffect } from 'react';

import { useSongs } from '../api/Music';
import { useGetWorkoutTemplates } from '../api/WorkoutTemplate';

export const WatchManager = {
    sendSongs: (songs: string) => {
        return NativeModules.WatchManager.sendSongs(songs);
    },
    sendWorkoutTemplates: (workoutTemplates: string) => {
        return NativeModules.WatchManager.sendWorkouts(workoutTemplates);
    },
    updateWorkoutId: (workoutId: string, templateId: string) => {
        return NativeModules.WatchManager.updateWorkoutId(workoutId, templateId);
    },
    togglePauseWorkout: (workoutId: string) => {
        return NativeModules.WatchManager.togglePauseWorkout(workoutId);
    },
    endWorkout: (workoutId: string) => {
        return NativeModules.WatchManager.endWorkout(workoutId);
    }
};

export const sendSongsToWatch = () => {
    const { data: songs, isSuccess } = useSongs();

    useEffect(() => {
        if (isSuccess && songs) {
            const songsJson = JSON.stringify(songs);
            WatchManager.sendSongs(songsJson).then(() => {
                console.log('Songs sent successfully');
            }).catch(error => {
                console.error('Failed to send songs', error);
            });
        }
    }, [isSuccess, songs]);
};

export const sendWorkoutTemplatesToWatch = () => {
    const { data: templates, isSuccess } = useGetWorkoutTemplates(1);

    useEffect(() => {
        if (isSuccess && templates) {
            const templatesJson = JSON.stringify(templates);
            WatchManager.sendWorkoutTemplates(templatesJson).then(() => {
                console.log('Templates sent successfully');
            }).catch(error => {
                console.error('Failed to send templates', error);
            });
        }
    }, [isSuccess, templates]);
}