import { NativeModules } from 'react-native';
import { useEffect } from 'react';

import { useSongs } from '../api/Music';

const WatchManager = {
    sendSongs: (songs: string) => {
        return NativeModules.WatchManager.sendSongs(songs);
    },
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