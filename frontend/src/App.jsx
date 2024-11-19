import { useState } from "react";
import Headlines from "./Headlines";
import Offer from "./Offer";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [contractType, setContractType] = useState("");
  const [region, setRegion] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false); // État pour détecter le clic sur "Chercher"

  const handleSearchClick = () => {
    setIsSearchClicked(true); // Met à jour l'état pour déclencher le filtrage
  };

  return (
    <div className="App">
      <Headlines
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        contractType={contractType}
        setContractType={setContractType}
        region={region}
        setRegion={setRegion}
        onSearchClick={handleSearchClick} // Passe la fonction pour détecter le clic
      />
      <Offer 
        searchTerm={searchTerm} 
        contractType={contractType} 
        region={region} 
        isSearchClicked={isSearchClicked} 
        setIsSearchClicked={setIsSearchClicked} // Reset après recherche
      />
    </div>
  );
}

export default App;
