export default function CardGrid({ cards }) {
    return (
      <div className="container mt-4">
        <h4 className="text-center mb-3">Player Cards</h4>
        <div className="row row-cols-2 row-cols-md-4 g-3">
          {cards.map(card => (
            <div className="col" key={card.id}>
              <div className="card bg-light h-100 text-center p-2">
                <img src={card.iconUrls.medium} className="card-img-top mx-auto" alt={card.name} style={{ height: '100px', objectFit: 'contain' }} />
                <div className="card-body">
                  <h6 className="card-title">{card.name}</h6>
                  <p className="card-text">Level: {card.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  