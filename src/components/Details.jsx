import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const { city } = useParams();  // Ottieni citta
  const [weatherData, setWeatherData] = useState(null);  //dati meteo
  const [forecastData, setForecastData] = useState(null);  //dati previsioni
  const [error, setError] = useState(null);  // errori

  const API_KEY = "816cf74c0f34e85d74f97ea1067bfec6";  // cambio chiave per sostituire in caso smetti di funzionare

  //  coordinate della citta
  const getCordinate = (city) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => ({
        lat: data.coord.lat,
        lon: data.coord.lon
      }))
      .catch((err) => {
        setError("Posto sconosciuto o più probabilmente non funzionano più le api :)))))");
        err;
      });
  };

  //  dati meteo attuali
  const getCurrentWeather = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .catch((err) => {
        setError("Forse piove piano");
        err;
      });
  };

  //  previsioni a 6 giorni * essere + dinamico e estetico
  const getPrevisioni = (lat, lon) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
      .then((response) => response.json())
      .catch((err) => {
        setError("Nel dubbio piove forte");
        err;
      });
  };

  useEffect(() => {
    if (!city) return;

    //  coordinate e dati meteo
    getCordinate(city)
      .then(({ lat, lon }) => {
        return Promise.all([getCurrentWeather(lat, lon), getPrevisioni(lat, lon)]);
      })
      .then(([currentData, forecastData]) => {
        setWeatherData(currentData);
        setForecastData(forecastData);
      })
      .catch(() => {});
  }, [city]);

  if (error) return <div className="allerta">{error}</div>;
  if (!weatherData) return <div>Sta a caricare</div>;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="container p-4 bg-white shadow-sm rounded" style={{ maxWidth: "800px" }}>
    <h1 className="text-center mb-4">{weatherData.name} - {weatherData.weather[0].description}</h1>
    <h3 className="text-center mb-3"> Oggi ci sono {weatherData.main.temp}°C</h3>
    <p className="text-center mb-3"> Temperatura min: {weatherData.main.temp_min}°C</p>
    <p className="text-center mb-3">Temperatura max: {weatherData.main.temp_max}°C</p>

    <h2 className="text-center mb-4">Previsioni per i prossimi giorni:</h2>
    <div className="row">
      {forecastData.list.slice(0, 6).map((forecast, index) => (
        <div key={index} className="col-12 col-sm-6 col-md-4 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">

                 {/* Ho cercato un date constructor  */}      
                {new Date(forecast.dt * 1000).toLocaleDateString("it-IT", {
                  weekday: "long",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </h5>
              <p className="card-text">
                <strong>{forecast.main.temp.toFixed(2)}°C</strong>                  {/* tofixed per arrotondare i gradi ottenuti  */}      

              </p>
              <p className="text-capitalize">{forecast.weather[0].description}</p>  
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Details;

