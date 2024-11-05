import { useState, useEffect } from "react";
import "./App.css";

function Offer({ searchTerm, contractType, region, isSearchClicked, setIsSearchClicked, id }) {
  const [visibleOffers, setVisibleOffers] = useState(5);
  const [filteredOffers, setFilteredOffers] = useState([]);

  useEffect(() => {
    fetch('/sample_data.json')
      .then(response => response.json())
      .then(data => {
        setFilteredOffers(data.offer);
      })
      .catch(error => console.error("Erreur lors du chargement des données :", error));
  }, [id]);

  useEffect(() => {
    if (isSearchClicked) {
      const offers = filteredOffers.filter((offer) => {
        const matchesSearchTerm = offer.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesContractType = contractType === "" || offer.type === contractType;
        const matchesRegion = region === "" || offer.location === region;

        return matchesSearchTerm && matchesContractType && matchesRegion;
      });
      setFilteredOffers(offers);
      setVisibleOffers(5); // Réinitialise le nombre d'offres visibles
      setIsSearchClicked(false); // Réinitialise l'état pour attendre le prochain clic
    }
  }, [isSearchClicked, searchTerm, contractType, region, setIsSearchClicked, filteredOffers]);

  const loadMoreOffers = () => {
    setVisibleOffers((prev) => prev + 5);
  };

  return (
    <div>
      <h1>Offres</h1>
      <div className="offer-container">
        {filteredOffers.slice(0, visibleOffers).map((offer, index) => (
          <OfferCard key={index} offer={offer} />
        ))}
      </div>
      {visibleOffers < filteredOffers.length && (
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
      <p><strong>Type de contrat:</strong> {offer.type}</p>
      <p><strong>Localisation:</strong> {offer.location}</p>
    </div>
  );
}

export default Offer;
