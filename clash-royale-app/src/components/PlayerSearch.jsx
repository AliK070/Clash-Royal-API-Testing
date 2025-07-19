import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayerSearch() {
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tag.trim()) return;
    const cleanTag = tag.trim().replace(/^#/, "");
    navigate(`/player/${cleanTag}`);
  };

  return (
    <div className="main-content">
      <form className="search-form" onSubmit={handleSubmit}>
        <h1 className="title">Search Player by Tag</h1>
        <input
          type="text"
          placeholder="e.g. 82J9C020U"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          maxLength={12}
          required
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
