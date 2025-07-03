import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerStats from '../components/PlayerDetails';
import CardGrid from '../components/CardGrid';

export default function Player() {
  const { tag } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/player/${tag}`);
        if (res.data.reason === 'notFound') {
          setError('Player not found.');
        } else {
          setPlayer(res.data);
        }
      } catch (err) {
        setError('Could not load player data.');
        console.error(err);
      }
    };

    fetchPlayer();
  }, [tag]);

  if (error) return <div className="container mt-4 text-danger">{error}</div>;
  if (!player) return <div className="container mt-4 text-center">Loading...</div>;

  return (
    <>
      <PlayerStats player={player} />
      <CardGrid cards={player.cards} />
    </>
  );
}
