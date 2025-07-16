import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerDetails() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [battles, setBattles] = useState([]);
  const [cards, setCards] = useState([]);
  const [upcomingChests, setUpcomingChests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardsCollapsed, setCardsCollapsed] = useState(true);
  const [error, setError] = useState("");
  const [clanInfo, setClanInfo] = useState(null);
  const [elixir, setElixir] = useState(0); 
  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const resPlayer = await axios.get(`http://localhost:3001/api/player/${tag}`);
        const resBattles = await axios.get(`http://localhost:3001/api/player/${tag}/battles`);
        const resCards = await axios.get("http://localhost:3001/api/cards");
        const resChests = await axios.get(`http://localhost:3001/api/player/${tag}/chests`);

        setPlayer(resPlayer.data);
        setBattles(resBattles.data.slice(0, 5));
        setCards(resCards.data.items);
        setUpcomingChests(resChests.data.items?.slice(0, 5) || []);

        if (resPlayer.data.clan?.tag) {
          const clanTag = resPlayer.data.clan.tag.replace('#', '');
          const resClan = await axios.get(`http://localhost:3001/api/clan/${clanTag}`);
          setClanInfo(resClan.data);
        }
      } catch {
        setError("Player not found or API error.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tag]);

  

  if (loading) return <p className="text-center mt-5">Loading player data...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!player) return null;

  const safeUrl = (url) => url?.replace(/^http:/, "https:");

  const favoriteCard = player.currentFavouriteCard;
  const primaryDeck = player.currentDeck || [];

  const getCardElixir = (id) => {
    const card = cards.find((c) => c.id === id);
    console.log("Card Found:", card); 
    return card?.elixirCost ?? 0; 
  };
  
  const deckWithElixir = primaryDeck.map((deckCard) => {
    const elixir = getCardElixir(deckCard.id);
    console.log("Deck Card with Elixir:", { ...deckCard, elixir });
    return { ...deckCard, elixir }; 
  });
  
  const averageElixir = deckWithElixir.length > 0
    ? (deckWithElixir.reduce((acc, c) => acc + c.elixir, 0) / deckWithElixir.length).toFixed(1)
    : "N/A"; 
  
  console.log("Cards Array:", cards); // Debugging cards array
  console.log("Primary Deck:", primaryDeck); // Debugging primary deck
  console.log("Deck with Elixir:", deckWithElixir); // Debugging deck with elixir values
  console.log("Average Elixir:", averageElixir); // Debugging average elixir calculation
  
  return (
    <div className="container mt-4 text-light">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="d-flex align-items-center mb-3">
        {player.league?.iconUrls?.medium && (
          <img
            src={safeUrl(player.league.iconUrls.medium)}
            alt="League"
            style={{ width: 60, height: 60, marginRight: 15 }}
          />
        )}
        <h2>
          {player.name} <small className="text-muted">({player.tag})</small>
        </h2>
      </div>

      <p>Trophies: {player.trophies}</p>
      <p>Wins: {player.wins} | Losses: {player.losses}</p>
      <p>Battle Count: {player.battleCount}</p>

      {player.clan ? (
        <div className="d-flex align-items-center mb-4 bg-secondary p-3 rounded">
          {player.clan.badge?.medium && (
            <img
              src={safeUrl(player.clan.badge.medium)}
              alt="Clan badge"
              style={{ width: 60, height: 60, marginRight: 15 }}
            />
          )}
          <div>
            <h4 className="mb-1">{player.clan.name}</h4>
            <p className="mb-0 text-light">
              Clan Score: {clanInfo?.clanScore ?? "N/A"} | War Trophies: {clanInfo?.clanWarTrophies ?? "N/A"}
            </p>
            <p className="mb-0 text-light">Role: {player.role || "Member"}</p>
          </div>
        </div>
      ) : (
        <p><em>No clan</em></p>
      )}

      {favoriteCard && (
        <div className="mb-4">
          <h3>Favorite Card</h3>
          <div className="d-inline-block bg-dark p-3 rounded text-center" style={{ width: 120 }}>
            <img
              src={safeUrl(favoriteCard.iconUrls?.medium || favoriteCard.iconUrls?.small)}
              alt={favoriteCard.name}
              className="img-fluid"
            />
            <p className="mt-2 mb-0">{favoriteCard.name}</p>
            <small>Max Level: {favoriteCard.maxLevel ?? "N/A"}</small>
          </div>
        </div>
      )}

{deckWithElixir.length > 0 && (
  <div className="mb-4">
    <h3>Primary Deck <small className="text-muted">(Avg. Elixir: {averageElixir})</small></h3>
    <div className="d-flex flex-wrap gap-3">
      {deckWithElixir.map((card) => (
        <div
          key={card.id}
          className="bg-dark p-2 rounded text-center"
          style={{ width: 100 }}
          data-bs-toggle="tooltip"
          title={`${card.name} (Level ${card.level})`}
        >
          <img
            src={safeUrl(card.iconUrls?.medium || card.iconUrls?.small)}
            alt={card.name}
            className="img-fluid"
          />
          <p className="mb-0">{card.name}</p>
          <small>Level: {card.level}</small><br />
          <small>Elixir: {card.elixir}</small>
        </div>
      ))}
    </div>
  </div>
)}


      <div className="mb-4">
        <h3>Upcoming Chests</h3>
        {upcomingChests.length > 0 ? (
          <div className="d-flex gap-2 flex-wrap">
            {upcomingChests.map((chest, i) => (
              <div
                key={i}
                className="bg-dark p-2 rounded text-center"
                style={{ width: 100 }}
              >
                <p className="mb-1">{chest.name}</p>
                <small>In {chest.index} chests</small>
              </div>
            ))}
          </div>
        ) : (
          <p>No chest info found.</p>
        )}
      </div>

      <div className="mb-4">
        <h3>Recent Battles</h3>
        {battles.length === 0 ? (
          <p>No recent battles found.</p>
        ) : (
          <ul className="list-group">
            {battles.map((battle, index) => {
              const playerTeam = battle.team[0];
              const opponent = battle.opponent[0];
              const result = playerTeam.crowns > opponent.crowns ? "Victory" : playerTeam.crowns === opponent.crowns ? "Draw" : "Defeat";
              return (
                <li key={index} className={`list-group-item bg-${result === "Victory" ? "success" : result === "Draw" ? "secondary" : "danger"} text-white`}>
                  <strong>{result}</strong> — {playerTeam.crowns} : {opponent.crowns} crowns
                  <div>
                    <small>Opponent: {opponent.name || "Unknown"} ({opponent.tag || "?"})</small>
                  </div>
                  <div>
                    <small>Type: {battle.type}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <button
          className="btn btn-outline-warning mb-3"
          onClick={() => setCardsCollapsed(!cardsCollapsed)}
        >
          {cardsCollapsed ? "Show All Cards" : "Hide All Cards"}
        </button>

        {!cardsCollapsed && (
          <div
            id="cardsCollapse"
            className="d-flex flex-wrap gap-3"
            style={{ maxHeight: 400, overflowY: "auto" }}
          >
            {player.cards.map((card) => (
              <div
                key={card.id}
                className="bg-dark p-2 rounded text-center"
                style={{ width: 100 }}
                data-bs-toggle="tooltip"
                title={`Level ${card.level} — ${card.name}`}
              >
                <img
                  src={safeUrl(card.iconUrls?.medium)}
                  alt={card.name}
                  className="img-fluid"
                />
                <p className="mb-0">{card.name}</p>
                <small>Level: {card.level}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
