import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlayerSearch() {
  const [tag, setTag] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tag.trim()) return;
    // Remove leading # if present
    const cleanTag = tag.trim().replace(/^#/, "");
    navigate(`/player/${cleanTag}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{height: "calc(100vh - 56px)"}}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, width: "100%" }}>
        <h1 className="mb-4 text-light text-center">Search Player by Tag</h1>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter player tag (e.g. 82J9C020U)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          maxLength={12}
          required
        />
        <button type="submit" className="btn btn-warning w-100">Search</button>
      </form>
    </div>
  );
}
