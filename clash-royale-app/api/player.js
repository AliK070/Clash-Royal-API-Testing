import fetch from 'node-fetch';

const BASE_URL = 'https://api.clashroyale.com/v1';
const API_TOKEN = process.env.API_TOKEN;

const HEADERS = {
  Authorization: `Bearer ${API_TOKEN}`,
  Accept: 'application/json',
};

export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: 'Player tag is required' });
  }

  const encodedTag = encodeURIComponent(`#${tag}`);
  const url = `${BASE_URL}/players/${encodedTag}`;

  try {
    const response = await fetch(url, { headers: HEADERS });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
}