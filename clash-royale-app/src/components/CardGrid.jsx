export default function CardGrid({ cards }) {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 text-primary">Player Cards</h2>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
        {cards.map((card) => (
          <div className="col" key={card.id}>
            <div className="card shadow-sm border-0 h-100 text-center">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">{card.name}</h6>
              </div>
              <div className="card-body d-flex flex-column align-items-center">
                <img
                  src={card.iconUrls.medium}
                  className="card-img-top mb-3"
                  alt={card.name}
                  style={{
                    height: "120px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <p className="card-text mb-0">
                  <strong>Level:</strong> {card.level}
                </p>
              </div>
              <div className="card-footer bg-light">
                <button className="btn btn-outline-primary btn-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}