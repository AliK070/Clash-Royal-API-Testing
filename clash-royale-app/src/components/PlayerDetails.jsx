import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlayerDetails() {
  const { tag } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cardsCollapsed, setCardsCollapsed] = useState(true);

  useEffect(() => {
    const fetchPlayer = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`http://localhost:3001/api/player/${tag}`);
        setPlayer(res.data);
      } catch {
        setError("Player not found or API error.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [tag]);

  if (loading) return <p className="text-center mt-5">Loading player data...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!player) return null;

  // Fix URLs to https
  const safeUrl = (url) => url?.replace(/^http:/, "https:");

  // Clan rank fallback: try clan.rank, clan.clanRank, or blank
  const clanRank = player.clan?.rank ?? player.clan?.clanRank ?? "";

  // Example favorite cards & primary deck data — adjust if API differs
  // Clash Royale API has "currentDeck" (primary deck) and "favoriteCard" or similar fields
  const favoriteCard = player.currentFavouriteCard || player.favoriteCard || null; 
  // currentFavouriteCard is common from some API versions, adjust accordingly

  const primaryDeck = player.currentDeck || player.mainDeck || player.deck || null;

  return (
    <div className="container mt-4 text-light">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div className="d-flex align-items-center mb-3">
        {player.league?.iconUrls?.medium && (
          <img
            src={safeUrl(player.league.iconUrls.medium)}
            alt="League badge"
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
            <p className="mb-0 text-muted">
              Clan Score: {player.clan.clanScore ?? "N/A"} | Rank: {clanRank || "N/A"}
            </p>
            <p className="mb-0 text-muted">Role: {player.role || "N/A"}</p>
          </div>
        </div>
      ) : (
        <p><em>Not in a clan</em></p>
      )}

      {favoriteCard && (
        <div className="mb-4">
          <h3>Favorite Card</h3>
          <div className="d-inline-block bg-dark p-3 rounded text-center" style={{width: 120}}>
            <img
              src={safeUrl(favoriteCard.iconUrls?.medium || favoriteCard.iconUrls?.small)}
              alt={favoriteCard.name}
              style={{ width: 80, height: 80, objectFit: "contain" }}
            />
            <p className="mt-2 mb-0">{favoriteCard.name}</p>
            <small>Level: {favoriteCard.level ?? "N/A"}</small>
          </div>
        </div>
      )}

      {primaryDeck && primaryDeck.length > 0 && (
        <div className="mb-4">
          <h3>Primary Deck</h3>
          <div className="d-flex gap-3 flex-wrap">
            {primaryDeck.map((card) => (
              <div
                key={card.id}
                className="bg-dark p-2 rounded text-center"
                style={{ width: 100 }}
              >
                <img
                  src={safeUrl(card.iconUrls?.medium || card.iconUrls?.small)}
                  alt={card.name}
                  style={{ width: "100%" }}
                />
                <p className="mb-0">{card.name}</p>
                <small>Level: {card.level ?? "N/A"}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collapsible Cards Section */}
      <div>
        <button
          className="btn btn-outline-warning mb-3"
          onClick={() => setCardsCollapsed(!cardsCollapsed)}
          aria-expanded={!cardsCollapsed}
          aria-controls="cardsCollapse"
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
              >
                <img
                  src={safeUrl(card.iconUrls.medium)}
                  alt={card.name}
                  style={{ width: "100%" }}
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
