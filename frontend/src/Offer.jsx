import { useState, useEffect } from "react";
import "./App.css";

function Offer({ searchTerm, contractType, region, isSearchClicked, setIsSearchClicked, id }) {
  const [visibleOffers, setVisibleOffers] = useState(5);
  const [filteredOffers, setFilteredOffers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5984/database_joblinker_prot3/_find', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selector: {},
        sort: [{ issued: "desc" }],
        limit: 100
      })
  })
      .then(response => response.json())
      .then(data => {
        // Adaptez au nouveau format JSON
        const allDocs = data.rows.map(row => row.doc);
        setFilteredOffers(allDocs);
      })
      .catch(error => console.error("Erreur lors du chargement des données :", error));
  }, [id]);

  useEffect(() => {
    if (isSearchClicked) {
      const offers = allOffers.filter((doc) => {
        const matchesSearchTerm = doc.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesContractType = contractType === "" || doc.type === contractType;
        const matchesRegion = region === "" || doc.location === region;
  
        return matchesSearchTerm && matchesContractType && matchesRegion;
      });
      setFilteredOffers(offers); // Met à jour les offres filtrées
      setVisibleOffers(5); // Réinitialise le nombre d'offres visibles
      setIsSearchClicked(false); // Réinitialise l'état pour attendre le prochain clic
    }
  }, [isSearchClicked, searchTerm, contractType, region, setIsSearchClicked, allOffers]);
  

  const loadMoreOffers = () => {
    setVisibleOffers((prev) => prev + 5);
  };

  return (
    <div>
      <h1>Offres</h1>
      <div className="offer-container">
        {filteredOffers.slice(0, visibleOffers).map((doc, index) => (
          <OfferCard key={index} doc={doc} />
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

function OfferCard({ doc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  const contentToShow = isExpanded ? doc.content : `${doc.content.substring(0, 100)}...`;

  return (
    <div className="offer-card">
      <h2>{doc.company}</h2>
      <h3>{doc.title}</h3>
      <p>{contentToShow}</p>
      <button onClick={toggleContent} className="see-more">
        {isExpanded ? "Voir moins" : "Voir plus"}
      </button>
      <p><strong>Date d'émission:</strong> {doc.issued}</p>
      <p><strong>Type de contrat:</strong> {doc.type}</p>
      <p><strong>Localisation:</strong> {doc.location}</p>
    </div>
  );
}

export default Offer;
