
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;
const API_TOKEN = process.env.API_TOKEN;

app.use(cors());

const BASE_URL = 'https://api.clashroyale.com/v1';
const HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: 'application/json'
};

// ========== PLAYER ROUTES ==========
app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/players/${tag}`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

app.get('/api/player/:tag/battles', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/players/${tag}/battlelog`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch battle log' });
  }
});

app.get('/api/player/:tag/chests', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/players/${tag}/upcomingchests`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch upcoming chests' });
  }
});

// ========== CLAN ROUTES ==========
app.get('/api/clan/:tag', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch clan info' });
  }
});

app.get('/api/clan/:tag/members', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}/members`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch clan members' });
  }
});

app.get('/api/clan/:tag/currentwar', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}/currentwar`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch current clan war' });
  }
});

app.get('/api/clan/:tag/warlog', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}/warlog`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch clan war log' });
  }
});

app.get('/api/clan/:tag/riverracelog', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}/riverracelog`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch river race log' });
  }
});

app.get('/api/clan/:tag/currentriverrace', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `${BASE_URL}/clans/${tag}/currentriverrace`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch current river race' });
  }
});

app.get('/api/clans/search', async (req, res) => {
  const { name } = req.query;
  const url = `${BASE_URL}/clans?name=${encodeURIComponent(name)}`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to search clans' });
  }
});

// ========== CARDS ==========
app.get('/api/cards', async (req, res) => {
  const url = `${BASE_URL}/cards`;
  try {
    const response = await fetch(url, { headers: HEADERS });
    res.status(response.status).json(await response.json());
  } catch {
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

app.get('/api/clan/:tag', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `https://api.clashroyale.com/v1/clans/${tag}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clan data' });
  }
});



app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
