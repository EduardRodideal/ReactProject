import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Recipe = (props) => {
    const APP_ID = '70b63bb2';
    const APP_KEY = '14c21cb3ac52bcb252136554ae2deb4b';    
    
    console.log(props)
    // console.log(props.location.pathname.substring(8));
    // console.log(QUERY);
    

    const [recipes, setRecipes] = useState([])
    const [image, setImage] = useState("");

    useEffect(() =>{
        const QUERY = props.location.search.substring(1);
        const getRecipe = async () => {        
            const api_call = await fetch(`https://api.edamam.com/search?q=${QUERY}&app_id=${APP_ID}&app_key=${APP_KEY}`);   
            const data = await api_call.json();
            setRecipes(data.hits);
            console.log(data.hits);                        
        }

        getRecipe();
    },[])

    useEffect(() => {
        const RECIPE_NUMBER = Number.parseInt(props.match.params.id); 
        const getImage = () => {
            if (recipes.length === 0) {
                return
            } else {
                setImage(recipes[RECIPE_NUMBER].recipe.image);
            }
        }

        getImage();
    }, [recipes])

    

    return ( recipes.length !== 0 &&
        <div className="container">
            <div className="active-recipe">
                <img 
                    className="active-recipe__img" 
                    src={image} 
                    alt={recipes.length === 0? "Loading" : recipes[props.match.params.id].recipe.label} 
                />
                <h3 className="active-recipe__title">
                    {recipes.length === 0? "Loading" : recipes[props.match.params.id].recipe.label}
                </h3>
                <h4 className="active-recipe__publisher">
                    Publisher: 
                    <span>
                        {recipes.length === 0? "Loading" : recipes[props.match.params.id].recipe.source}
                    </span>                    
                </h4>
                <p className="active-recipe__website">
                    Website: 
                    <span>
                        <a href={recipes.length === 0? "Loading" : recipes[props.match.params.id].recipe.url}>
                            {recipes.length === 0? "Loading" : recipes[props.match.params.id].recipe.url}
                        </a>                        
                    </span>                    
                </p>
                <button className="active-recipe__button">
                    <Link to="/">Go Home</Link>
                </button>
            </div>
        </div>
    );
}


export default Recipe;