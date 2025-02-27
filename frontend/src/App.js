import BSBai from './Images/BSBai.png';
import BodyShops from './Components/BodyShops';
import './Styling/App.css';

function App() {
  return (
    <BodyShops/>
    // <div className="App">
    //   <AppHeader/>
    //   
    // </div>
  );
}

function AppHeader() {
  return (
    <header className="App-header">
        <img src={BSBai} className="App-logo" alt="logo" />
        <p>Car Damage Estimator</p>
    </header>
  );
}


export default App;
