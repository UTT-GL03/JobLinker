import { useState, useEffect } from "react";
import "./App.css";

function Offer({ searchTerm, contractType, region, isSearchClicked, setIsSearchClicked, id }) {
  const [visibleOffers, setVisibleOffers] = useState(5);
  const [allOffers, setAllOffers] = useState([]); // Toutes les offres
  const [filteredOffers, setFilteredOffers] = useState([]); // Offres filtrées

  useEffect(() => {
    fetch("http://localhost:5984/database_joblinker_prot3/_find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        selector: {},
        sort: [{ issued: "desc" }], // Assurez-vous que "issued" est indexé dans CouchDB
        limit: 100,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const allDocs = data.docs; // Correction : accède directement aux documents
        setAllOffers(allDocs); // Stocke toutes les offres
        setFilteredOffers(allDocs); // Initialise les offres filtrées
      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }, [id]);

  useEffect(() => {
    if (isSearchClicked) {
      const offers = allOffers.filter((doc) => {
        const matchesSearchTerm = doc.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesContractType =
          contractType === "" || doc.type === contractType;
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

  // Utilisation sécurisée du contenu
  const contentToShow = doc.content
    ? isExpanded
      ? doc.content
      : `${doc.content.substring(0, 100)}...`
    : "Pas de description disponible.";

  return (
    <div className="offer-card">
      <h2>{doc.company || "Entreprise inconnue"}</h2>
      <h3>{doc.title || "Titre non spécifié"}</h3>
      <p>{contentToShow}</p>
      <button onClick={toggleContent} className="see-more">
        {isExpanded ? "Voir moins" : "Voir plus"}
      </button>
      <p>
        <strong>Date d'émission:</strong> {doc.issued || "Non spécifiée"}
      </p>
      <p>
        <strong>Type de contrat:</strong> {doc.type || "Non spécifié"}
      </p>
      <p>
        <strong>Localisation:</strong> {doc.location || "Non spécifiée"}
      </p>
    </div>
  );
}

export default Offer;
