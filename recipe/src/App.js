import React, {useEffect, useState} from 'react';
import Recipes from './components/Recipes';
import style from './components/recipe.module.css'
import './App.css';

const App = () => {

  const APP_ID = '70b63bb2'
  const APP_KEY = '14c21cb3ac52bcb252136554ae2deb4b'

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [numRecipe, setNumRecipe] = useState(10);
  const [nameRecipe, setNameRecipe] = useState(query);
  const [counter, setCounter] = useState(0);
  
  
  useEffect(() => {
    getRecipes();
  }, [query]);

  useEffect(() => {
    getNumRecipe();
  }, [recipes])

  const getNumRecipe = () => {
    if (counter === 0) {
      setCounter(counter + 1)
      return
    } else {
      setNumRecipe(recipes.length)
      setNameRecipe(query);
      setCounter(counter + 1);
    }
    
  }

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const upadateSearch = (e) => {
    setSearch(e.target.value )    
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  let index = 0;
  const noRecipe = <p className={style.recipepar}>We have no recipe for {nameRecipe} </p>


  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text" 
          value={search}
          onChange={upadateSearch}
        />
        <button className="search-button" type="submit">Search</button>               
      </form>
      {numRecipe > 0 ? null : noRecipe}
      <div className="recipes">    
        {recipes.map(recipe => { 
          index++;
          return (
          <Recipes 
            key={recipe.recipe.label + index} 
            image={recipe.recipe.image}
            title={recipe.recipe.label}
            calories={Number.parseFloat(recipe.recipe.calories).toPrecision(6) }
            ingredients={recipe.recipe.ingredientLines}
          />
        )})}
      </div>
    </div>
  )
}

export default App;
