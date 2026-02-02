import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Detail = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then(res => res.json())
      .then(data => setCountry(data[0]));
  }, [code]);

  if (!country) return <div className="loading">Loading details...</div>;

  return (
  <div className="detail-page" style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    
    <div className="back-btn-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <span>←</span> Back Home
      </button>
    </div>
    
    <div className="detail-content" style={{ textAlign: 'center' }}>
      <div className="detail-flag-container">
        <img 
          src={country.flags.svg} 
          alt={country.name.common} 
          className="detail-flag" 
        />
      </div>

      <div className="detail-text">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{country.name.common}</h2>
        <div style={{ display: 'inline-block', textAlign: 'left', fontSize: '1.2rem' }}>
           <p><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common}</p>
           <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(", ")}</p>
           <p><strong>Currencies:</strong> {Object.values(country.currencies || {}).map(c => c.name).join(", ")}</p>
        </div>
      </div>
    </div>

      {/* แผนที่ (Bonus) */}
      <div className="map-section">
        <h3>Location on Map</h3>
        <div style={{ height: "400px", width: "100%" }}>
          <MapContainer center={[country.latlng[0], country.latlng[1]]} zoom={4} style={{height: "100%"}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[country.latlng[0], country.latlng[1]]}>
              <Popup>{country.name.common}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Detail;