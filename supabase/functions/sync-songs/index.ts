// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { SpotifyApi } from 'npm:@spotify/web-api-ts-sdk@1.2.0';
import { Database, TablesInsert } from '../_shared/db.types.ts';

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

serve(async (req) => {
  // fetch all apple music song from request
  const { songs } = (await req.json()) as {
    songs: {
      id: string;
      title: string;
      artist: string;
    }[];
  };

  console.log(songs);

  // get all song ids from supabase for user
  const { data: existingSongs, error } = await supabase
    .from('songs')
    .select('apple_music_id')
    .in(
      'apple_music_id',
      songs.map((song) => song.id)
    );
  if (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const existingSongIds = new Set(
    existingSongs.map((song) => song.apple_music_id)
  );

  // check if all song ids are in supabase
  const missingSongs = songs.filter((song) => !existingSongIds.has(song.id));

  console.log('missing songs', missingSongs);

  if (missingSongs.length === 0) {
    return new Response(JSON.stringify({ shouldRefetch: 'no' }), {
      headers: { 'Content-Type': 'application/json' },
    });
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

    const song: TablesInsert<'songs'> = {
      title: track.name,
      artist: track.artists.map((artist) => artist.name).join(', '),
      duration_ms: track.duration_ms,
      spotify_id: track.id, // track is from spotify
      apple_music_id: rawSong.id, // raw song is apple music
      artwork_url,
    };

    return [...acc, song];
  }, Promise.resolve([] as TablesInsert<'songs'>[]));

  // insert missing songs into supabase
  const { error: insertError } = await supabase
    .from('songs')
    .insert(songsToInsert);
  if (insertError) {
    return new Response(JSON.stringify(insertError), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ shouldRefetch: 'yes' }), {
    headers: { 'Content-Type': 'application/json' },
  });
});

// async function getSpotifyTracks(
//   songIds: { spotifyId: string; appleMusicId: string }[]
// ): Promise<TablesInsert<'songs'>[]> {
//   const tracks = await spotify.tracks.get(
//     songIds.map((song) => song.spotifyId)
//   );

//   // parse spotify track to db format
//   return tracks.map((track, index) => {
//     return {
//       apple_music_id:
//         songIds.length > index ? songIds[index].appleMusicId : 'missing-id',
//       title: track.name,
//       artists: track.artists.map((artist) => artist.name),
//       duration_ms: track.duration_ms,
//       spotify_id: track.id,
//       artwork_url: track.
//     };
//   });
// }

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
