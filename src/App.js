import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Auth from './pages/auth';
import Home from './pages/Home';
import CreateRecipe from './pages/create-recipe'
import SavedRecipes from './pages/saved-recipes';
import NavBar from './components/navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
