import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function Headlines() {
  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker la valeur de recherche
  const [contractType, setContractType] = useState(""); // État pour le type de contrat
  const [region, setRegion] = useState(""); // État pour la région sélectionnée

  // Liste des régions françaises
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

  return (
    <header>
      <div class="topnav">
        <h1>
          <img src={reactLogo} />
          JobLinker
        </h1>

        <form>
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

          <input type="submit" value="Chercher"></input>
        </form>
      </div>
    </header>
  );
}

export default Headlines;
