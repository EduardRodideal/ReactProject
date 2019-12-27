import React from 'react';
import {Link} from 'react-router-dom';

const Recipes = (props) => {
    let counter = 0;
    return (
        <div className="container">
            <div className="row">
                {props.recipes.map((recipe) => (
                    <div 
                        key={recipe.recipe.image} 
                        className="col-md-4"
                        style={{marginBottom:"2rem"}}
                    >
                            
                        <div className="recipes__box">
                            <img 
                                className="recipe__box-img"
                                src={recipe.recipe.image} 
                                alt={recipe.recipe.label} 
                            />
                            <div className="recipe__text">
                                <h5 className="recipes__title">
                                    {recipe.recipe.label.length < 20 ? 
                                    `${recipe.recipe.label}` : 
                                    `${recipe.recipe.label.substring(0, 25)}...`}
                                </h5>  
                                <p className="recipes__subtitle">
                                    Publisher: 
                                    <span>
                                        {recipe.recipe.source}
                                    </span>  
                                </p>                              
                            </div>
                            <button className="recipe_buttons">
                                <Link to={{pathname:`/recipe/${counter++}`, search:`${props.query}` }  }>View Recipe</Link>
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        // recipes.map((recipe) => (
        //     <div key={recipe.recipe.image}>
        //         <img src={recipe.recipe.image} alt={recipe.recipe.label} />
        //         <p> {recipe.recipe.label} </p>
        //     </div>
        // ))

        // <div key={recipe.recipe.image}>
        //                 <img src={recipe.recipe.image} alt={recipe.recipe.label} />
        //                 <p> {recipe.recipe.label} </p>
        //             </div>
    )
}


export default Recipes