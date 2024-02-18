import { Hono } from 'https://deno.land/x/hono@v3.0.1/mod.ts';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { syncSongs } from './sync-songs.ts';
import { syncPlaylists } from './sync-playlists.ts';
import { StatusCode } from 'https://deno.land/x/hono@v3.0.1/utils/http-status.ts';

const app = new Hono();

app.post('/music', (c) => {
  return c.json({ message: 'Welcome to the music service' });
});

app.post('/music/sync-playlists', async (c) => {
  const body = (await c.req.json()) as {
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
  };

  const { resBody, status } = await (async () => {
    try {
      const { body: resBody, status } = await syncPlaylists(body);
      return { resBody, status };
    } catch (e) {
      console.log('func error', e);
      return {
        resBody: { message: 'Internal server error' },
        status: 500 as StatusCode,
      };
    }
  })();

  console.log('got resBody', resBody);

  c.status(status);
  return c.json(resBody);
});

app.post('/music/sync-songs', async (c) => {
  const body = (await c.req.json()) as {
    songs: {
      id: string;
      title: string;
      artist: string;
    }[];
  };

  const { body: resBody, status } = await syncSongs(body);

  c.status(status);
  return c.json(resBody);
});

app.notFound((c) => {
  c.status(404);
  return c.json({ message: `Not found ${c.req.method} path: ${c.req.url}` });
});

serve(app.fetch);
