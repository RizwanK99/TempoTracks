import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
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

// create clients
const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SyncPlaylistsProps {
  playlists: {
    id: string;
    artwork_url: string | null;
    title: string;
    description: string;
    kind: string;
    tracks: {
      id: string;
      title: string;
      artistName: string;
    }[];
  }[];
}

export const syncPlaylists = async (
  body: SyncPlaylistsProps
): Promise<{
  status: StatusCode;
  body: Record<string, unknown>;
}> => {
  // fetch all apple music song from request
  const { playlists } = body;

  // get all song ids from supabase for user
  const { data: existingPlaylists, error } = await supabase
    .from('playlists')
    .select('apple_music_id');

  if (error) {
    console.log('error', error);
    throw error;
  }

  const existingPlaylistIds = new Set(
    existingPlaylists.map((playlist) => playlist.apple_music_id)
  );

  // check if all song ids are in supabase
  const missingPlaylists = playlists.filter(
    (playlist) => !existingPlaylistIds.has(playlist.id)
  );

  console.log('missingPlaylists', missingPlaylists);

  if (missingPlaylists.length === 0) {
    return {
      status: 200,
      body: { shouldRefetch: 'no' },
    };
  }

  // https://i0.wp.com/olumuse.org/wp-content/uploads/2020/09/unnamed.jpg?fit=512%2C512&ssl=1
  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWbXiZo4wvXOUEvAxR3v_U3wrLEKKiP4Ru8Q&usqp=CAU
  // https://marketplace.canva.com/EAFIKP1l1AU/1/0/1600w/canva-blue-purple-cute-bright-lofi-study-playlist-cover-U8HtmB7MB00.jpg

  // insert missing playlists

  const playlistsToInsert: TablesInsert<'playlists'>[] = missingPlaylists.map(
    (playlist) => {
      return {
        apple_music_id: playlist.id,
        name: playlist.title,
        artwork_url:
          playlist.artwork_url ??
          'https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png',
        length: playlist.tracks.length,
      };
    }
  );

  // insert playlists into supabase
  const { error: insertError } = await supabase
    .from('playlists')
    .upsert(playlistsToInsert);
  if (insertError) {
    throw insertError;
  }

  // insert playlist linked songs to supabase
  const { error: insertSongsError } = await supabase
    .from('playlist_items')
    .upsert(
      missingPlaylists.reduce((acc, playlist) => {
        return [
          ...acc,
          ...playlist.tracks.map((track) => {
            return {
              playlist_id: playlist.id,
              apple_music_id: track.id,
            };
          }),
        ];
      }, [] as TablesInsert<'playlist_items'>[])
    );
  if (insertSongsError) {
    throw insertSongsError;
  }

  return {
    status: 200,
    body: { shouldRefetch: 'yes' },
  };
};
