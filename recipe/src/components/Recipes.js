import React, {useState} from 'react'
import style from './recipe.module.css'

const Recipes = ({image, calories, title, ingredients}) => {
    const [imageStyle, setStyle] = useState(style.image);

    const handleClick = () => {
        if (imageStyle === style.image) {
            setStyle(null)
        } else {
            setStyle(style.image);
        }
    }
    let index = 0;
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ul>
                {ingredients.map(ingredient => {
                    index++;
                    return (
                        <li key={ingredient + index}> {ingredient} </li>
                    )
                })}
                {/* {ingredients.map(ingredient =>(
                    <li key={ingredient}> {ingredient} </li>
                ))} */}
            </ul>
            <p> calories: {calories} </p>
            <img 
                className={imageStyle} 
                src={image} 
                alt="" 
                onClick={handleClick}
            />
        </div>
    );
}


export default Recipes;