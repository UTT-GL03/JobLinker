import { useState } from "react";
import data from './assets/sample_data.json';
import "./App.css";

function Offer() {
  const [visibleOffers, setVisibleOffers] = useState(5); // Nombre d'offres visibles initialement

  const loadMoreOffers = () => {
    setVisibleOffers((prev) => prev + 5); // Charge 5 offres de plus à chaque clic
  };

  return (
    <div>
      <h1>Offres</h1>
      <div className="offer-container">
        {data.offer.slice(0, visibleOffers).map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
      {visibleOffers < data.offer.length && ( // Vérifie s'il reste des offres à charger
        <button onClick={loadMoreOffers} className="load-more">
          Voir plus d'offres
        </button>
      )}
    </div>
  );
}

function OfferCard({ offer }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const contentToShow = isExpanded ? offer.content : `${offer.content.substring(0, 100)}...`;

  return (
    <div className="offer-card">
      <h2>{offer.company}</h2>
      <h3>{offer.title}</h3>
      <p>{contentToShow}</p>
      <button onClick={toggleContent} className="see-more">
        {isExpanded ? "Voir moins" : "Voir plus"}
      </button>
      <p><strong>Date d'émission:</strong> {offer.issued}</p>
    </div>
  );
}

export default Offer;
