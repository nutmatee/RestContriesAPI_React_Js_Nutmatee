//i have no clue what happend here, sorry teacher. i use Gemeni for ts
import { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const Home = () => {
  const [countries, setCountries] = useState([]); 
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          setCountries([]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Can't fetch data, try again later");
        setLoading(false);
      });
  }, []);

  const filteredCountries = Array.isArray(countries) 
    ? countries.filter(c => 
        c.name.common.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>กำลังโหลด...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center'}}>{error}</div>;

  return (
    <div className="home-page-container">
    <header className="main-header">
      <h1>Nutmetee's RestContriesAPI</h1>
      <p>ค้นหาข้อมูลและพิกัดประเทศต่างๆ ทั่วโลก</p>
      <p>โดย ณัฐเมธี พันธ์รังสิต 68409010904</p>
    </header>

    <div className="home-page">
      <input 
        type="text" 
        placeholder="Search for a country..." 
        className="search-bar"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="country-grid">
        {filteredCountries.map(country => (
          <Link to={`/country/${country.cca3}`} key={country.cca3} className="country-card">
            <img src={country.flags.svg} alt={country.name.common} />
            <div className="card-info">
              <h3>{country.name.common}</h3>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Home;