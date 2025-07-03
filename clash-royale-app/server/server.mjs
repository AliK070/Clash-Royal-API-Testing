import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;

const API_TOKEN = process.env.API_TOKEN;

app.use(cors());

app.get('/api/player/:tag', async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const url = `https://api.clashroyale.com/v1/players/${tag}`;

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
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
