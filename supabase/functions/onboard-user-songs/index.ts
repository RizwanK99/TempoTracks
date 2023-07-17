// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { Buffer } from "https://deno.land/std@0.139.0/node/buffer.ts";
import _ from "https://raw.githubusercontent.com/lodash/lodash/4.17.21-es/lodash.js"

// Supabase env variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

// create supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Spotify env variables
const SPOTIFY_CLIENT_ID = Deno.env.get('SPOTIFY_CLIENT_ID')
const SPOTIFY_CLIENT_SECRET = Deno.env.get('SPOTIFY_CLIENT_SECRET')


serve(async (req) => {
  // Request should be passed in the format 
  // { songs: [{ title: string, artist: string }] }
  const { songs } = await req.json()
  
  // check for spotify credentials
  if (SPOTIFY_CLIENT_ID === undefined || SPOTIFY_CLIENT_SECRET === undefined) {
    return new Response(
      JSON.stringify({ error: 'Missing Spotify credentials' }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  // fetch spotify access token
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${(new Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  // deconstruct json response
  const accessTokenRes = await res.json()
  const { access_token: accessToken, error: acessTokenError  } = accessTokenRes;
  if (acessTokenError) {
    return new Response(
      JSON.stringify({ error: acessTokenError }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  // get list of spotify song ids and other metadata based on song titles and artists
  const songsSpotifyMetadata = await Promise.all(songs.map(async (song) => {
    const { title, artist } = song
    const trackRes = await fetch(`https://api.spotify.com/v1/search?q=${title} ${artist}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}}`
      }
    })
    const tracks = await trackRes.json()
    const topTrack = tracks.tracks.items[0];
    return {
      artists: topTrack.artists.map((artist) => artist.name),
      title: topTrack.name,
      spotifyId: topTrack.id,
      duration_ms: topTrack.duration_ms,
      isrc: topTrack.external_ids.isrc,
    }
  }))

  // get songs audio features from spotify
  const songIds = songsSpotifyMetadata.map((song) => song.spotifyId)
  const audioFeaturesRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${songIds.join(',')}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}}`
    }
  })
  const audioFeatures = await audioFeaturesRes.json()

  // combine song metadata and audio features
  const songsWithAudioFeatures = songsSpotifyMetadata.map((song) => {
    const audioFeature = audioFeatures.audio_features.find((audioFeature) => audioFeature.id === song.spotifyId)
    return _.omit({
      ...song,
      ...audioFeature,
    }, ["uri", "track_href", "analysis_url", "type", "spotifyId"])
  })

  // insert songs into supabase
  const { data: insertedSongs, error: insertSongsError } = await supabase
    .from('songs')
    .upsert(songsWithAudioFeatures)
  if (insertSongsError) {
    return new Response(
      JSON.stringify({ error: insertSongsError }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  return new Response(
    JSON.stringify({ songsWithAudioFeatures }),
    { headers: { "Content-Type": "application/json" } },
  )
})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
