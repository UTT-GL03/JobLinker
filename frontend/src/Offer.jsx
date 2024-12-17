import { useState, useEffect } from "react";
import "./App.css";

function Offer({ searchTerm, contractType, region, isSearchClicked, setIsSearchClicked, id }) {
  
  const [allOffers, setAllOffers] = useState([]); 
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [nextBookmark, setNextBookmark] = useState()
  const [requestedBookmark, setRequestedBookmark] = useState()
  const [hasMoreOffers, setHasMoreOffers] = useState(true)

  const fetchOffers = (previousArticles) => {
    fetch("http://localhost:5984/database_joblinker_prot3/_find", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          selector: {
            ...(contractType && { type: contractType }),
            ...(region && {location: region} )
          },
          sort: [
            {
              issued: "desc"
            }
          ],
          limit: 25,
        bookmark: requestedBookmark
      })
    })
      .then((response) => response.json())
      .then((data) => {
        const allDocs = data.docs; 
        setAllOffers([...allOffers, ...allDocs]);
        setNextBookmark(data.bookmark); 
        setFilteredOffers((prev) => [...prev, ...allDocs]);

        if (allDocs.length === 0) {
          setHasMoreOffers(false);
        }

      })
      .catch((error) =>
        console.error("Erreur lors du chargement des données :", error)
      );
  }    
  
  
  useEffect(() => {
    console.log({requestedBookmark});
    // fetch('http://localhost:5984/qvotidie/_all_docs?include_docs=true ')
    fetchOffers(allOffers)

  }, [id,requestedBookmark]);

  useEffect(() => {
    console.log({isSearchClicked});
    if (isSearchClicked) {
      setFilteredOffers([]); 
      setAllOffers([]); 
      setRequestedBookmark(undefined); 
      fetchOffers([]); 
      setIsSearchClicked(false); 
      
    }
  }, [isSearchClicked, searchTerm, contractType, region, allOffers]);



  return (
    <div>
      <h1>Offres</h1>
      <div className="offer-container">
        {filteredOffers.map((doc, index) => (
          <OfferCard key={index} doc={doc} />
        ))}
      </div>
      {nextBookmark && (
  <button 
    onClick={() => {
      setRequestedBookmark(nextBookmark); // Charge les offres suivantes
    }} 
    className="load-more"
  >
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

  const contentToShow = isExpanded
    ? doc.content || "Description non disponible."
    : `${(doc.content || "Description non disponible.").substring(0, 100)}...`;

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
