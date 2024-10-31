import reactLogo from "./assets/react.svg";
import "./App.css";

function Headlines({ searchTerm, setSearchTerm, contractType, setContractType, region, setRegion, onSearchClick }) {
  const regions = [
    "Auvergne-Rhône-Alpes",
    "Bourgogne-Franche-Comté",
    "Bretagne",
    "Centre-Val de Loire",
    "Corse",
    "Grand Est",
    "Hauts-de-France",
    "Île-de-France",
    "Normandie",
    "Nouvelle-Aquitaine",
    "Occitanie",
    "Pays de la Loire",
    "Provence-Alpes-Côte d'Azur",
    "Guadeloupe",
    "Martinique",
    "Guyane",
    "La Réunion",
    "Mayotte",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchClick(); // Appel de la fonction pour déclencher le filtrage
  };

  return (
    <header>
      <div className="topnav">
        <h1>
          <img src={reactLogo} alt="React Logo" />
          JobLinker
        </h1>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Titre de l'offre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <label htmlFor="contractType">Type de contrat :</label>
          <select
            id="contractType"
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
          >
            <option value="">Tous</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="Stage">Stage</option>
            <option value="VIE">VIE</option>
          </select>

          <label htmlFor="region">Région :</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="">Toutes les régions</option>
            {regions.map((regionName) => (
              <option key={regionName} value={regionName}>
                {regionName}
              </option>
            ))}
          </select>

          <button type="submit">Chercher</button>
        </form>
      </div>
    </header>
  );
}

export default Headlines;
