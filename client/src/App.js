import './App.css';
import {Router} from "@reach/router";
import PetForm from "./views/PetForm";
import PetList from "./views/PetList"; 
import PetDetails from './views/PetDetails';
import PetUpdateForm from './views/PetUpdateForm';

function App() {
  return (
    <div className="App">
      <Router>
        <PetList path="/"/>
        <PetForm path="/pets/new"/>
        <PetDetails path="pets/:id"/>
        <PetUpdateForm path="/pets/:id/edit"/>
      </Router>
    </div>
  );
}

export default App;
