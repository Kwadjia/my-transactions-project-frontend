import BSBai from './BSBai.png';
import BodyShops from './BodyShops';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <BodyShops/>
    </div>
  );
}

function AppHeader() {
  return (
    <header className="App-header">
        <img src={BSBai} className="App-logo" alt="logo" />
        <p>Arthur's Body Shop Bidz</p>
    </header>
  );
}

// const fetchBodyShops = async (latitude, longitude) => {
//   console.log("API URL:", process.env.REACT_APP_API_URL);
  
//   fetch(`${process.env.REACT_APP_API_URL}/body_shops/search?latitude=${latitude}&longitude=${longitude}`)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error("Error fetching:", error));
// };

export default App;
