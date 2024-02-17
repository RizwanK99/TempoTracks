import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { SpotifyApi } from 'npm:@spotify/web-api-ts-sdk@1.2.0';
import { Database, TablesInsert } from '../_shared/db.types.ts';
import { StatusCode } from 'https://deno.land/x/hono@v3.0.1/utils/http-status.ts';

// Supabase env variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
if (!SUPABASE_URL) {
  throw new Error('Please provide a SUPABASE_URL');
}
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
if (!SUPABASE_ANON_KEY) {
  throw new Error('Please provide a SUPABASE_ANON_KEY');
}

const SPOTIFY_CLIENT_ID = '4f81401fe6004f84b1824c388dd2c223';
const SPOTIFY_CLIENT_SECRET = '3bd2be2c6554450298fff1d48413c4c5';

// create clients
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
const spotify = SpotifyApi.withClientCredentials(
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET
);

interface SyncSongsProps {
  songs: {
    id: string;
    title: string;
    artist: string;
  }[];
}

export const syncSongs = async (
  body: SyncSongsProps
): Promise<{
  status: StatusCode;
  body: Record<string, unknown>;
}> => {
  // fetch all apple music song from request
  const { songs } = body;

  console.log(songs);

  // get all song ids from supabase for user
  const { data: existingSongs, error } = await supabase
    .from('songs')
    .select('apple_music_id');
  if (error) {
    return {
      status: 500,
      body: error,
    };
  }
  const existingSongIds = new Set(
    existingSongs.map((song) => song.apple_music_id)
  );

  // check if all song ids are in supabase
  const missingSongs = songs.filter((song) => !existingSongIds.has(song.id));

  console.log('missing songs', missingSongs);

  if (missingSongs.length === 0) {
    return {
      status: 200,
      body: { shouldRefetch: 'no' },
    };
  }

  // find missing songs on spotify
  const songsToInsert = await missingSongs.reduce(async (prev, rawSong) => {
    const acc = await prev;

    const trackSearch = await spotify.search(
      `${rawSong.title} ${rawSong.artist}`,
      ['track']
    );

    if (trackSearch.tracks.items.length === 0) {
      return acc;
    }

    const track = trackSearch.tracks.items[0];

    console.log('for song', rawSong, 'found track', track.name, track.artists);

    const artwork_url = (() => {
      // return the first image of the album
      if (track.album.images.length > 0) {
        return track.album.images[0].url;
      }

      // return a default image
      return 'https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png';
    })();

    const songDetails = await (async () => {
      const details = await spotify.tracks.audioFeatures(track.id);

      return {
        acousticness: details.acousticness,
        danceability: details.danceability,
        energy: details.energy,
        instrumentalness: details.instrumentalness,
        liveness: details.liveness,
        loudness: details.loudness,
        tempo: details.tempo,
        valence: details.valence,
      };
    })();

    const song: TablesInsert<'songs'> = {
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      duration_ms: track.duration_ms,
      spotify_id: track.id, // track is from spotify
      apple_music_id: rawSong.id, // raw song is apple music
      artwork_url,
      ...songDetails,
    };

    return [...acc, song];
  }, Promise.resolve([] as TablesInsert<'songs'>[]));

  // insert missing songs into supabase
  const { error: insertError } = await supabase
    .from('songs')
    .insert(songsToInsert);
  if (insertError) {
    return {
      status: 500,
      body: insertError,
    };
  }

  return {
    status: 200,
    body: { shouldRefetch: 'yes' },
  };
};
