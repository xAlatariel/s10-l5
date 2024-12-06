import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Homepage() {
  const [city, setCity] = useState("");  

  const handleChange = (e) => {
    setCity(e.target.value);  // Aggiorna citta
  };

  return (
<div className="d-flex justify-content-center align-items-center vh-100 bg-light">
<div className="container p-4 bg-white shadow-sm rounded">
      <h1 className="text-center mb-4">Visualizza il meteo della tua città</h1>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Cerca e guarda se serve l'ombrello"
        value={city}
        onChange={handleChange} // aggiorna input
        required
      />
      <Link to={`/Details/${city}`} className="btn btn-primary btn-block w-100">
        Ricordi dove abiti?
      </Link>
    </div>
  </div>
  );
}

export default Homepage;
