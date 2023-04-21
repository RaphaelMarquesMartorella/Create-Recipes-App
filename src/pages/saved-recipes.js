import axios from 'axios';
import { useEffect, useState } from 'react';
import useGetUserID  from '../hooks/useGetUserID';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([])

  const userID = useGetUserID();
  
  
  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get
        (`http://localhost:3001/recipes/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes)
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchSavedRecipe()

  }, [])

  
    if(savedRecipes == []) {
      setSavedRecipes(false)
    }
  
  
  return (
    <div className='home'>
      <h1>
        Saved Recipes
      </h1>
      {(!savedRecipes) && <h2>There's no saved Recipe </h2>}
      {(savedRecipes) && <ul>
      {savedRecipes.map((recipe, i) => (
        
          <li key={i}>
            <div>
              <h2>{recipe.name}</h2>
              
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li> 
        ))}
      </ul>}
    </div>
  )
}

export default SavedRecipes