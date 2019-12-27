import React, {useState, useEffect} from 'react'
import Recipes from './Recipes';

const Form = () => {

    const APP_ID = '70b63bb2';
    const APP_KEY = '14c21cb3ac52bcb252136554ae2deb4b';

    const [search, setSearch] = useState("");
    const [query, setQuery] = useState('apple');
    const [recipes, setRecipes] = useState([]);
    const [queryLocal, setQueryLocal] = useState("");
    

    
    
    useEffect(() => {
        const getRecipe = async () => {        
            const api_call = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);   
            const data = await api_call.json();            
            setRecipes(data.hits);
            console.log(data.hits);             
        }  

        const getLocalStorageRecipe = () => {
            const json = localStorage.getItem("localRecipes");
            const recipesFromJson = JSON.parse(json);
            setRecipes(recipesFromJson)


            const json1 = localStorage.getItem("localQuery");
            const queryFromJson = JSON.parse(json1);
            setQuery(queryFromJson)
            
        }

        // || localStorage.getItem("localRecipes") !== "[]" 
        //                     && localStorage.getItem("localRecipes") === null && search !== "apple") {
        //     getLocalStorageRecipe();
        
        if (query === "apple" && localStorage.getItem("localRecipes") !== "[]" && localStorage.getItem("localRecipes") !== null ) {
            console.log("from storage")
            getLocalStorageRecipe();          
        } else if (query === queryLocal) {
            console.log("from second storage")
            getLocalStorageRecipe();  
        } else {
            console.log("request")
            console.log(localStorage.getItem("localQuery"))
            getRecipe();
        }
         
                        
    }, [query, queryLocal]);

    //component did update
    useEffect(() => {
        const saveData = () => {
            const localRecipes = JSON.stringify(recipes);
            localStorage.setItem("localRecipes", localRecipes);  
            const localQuery = JSON.stringify(query);
            localStorage.setItem("localQuery", localQuery);       
        }  
                
        
        saveData();
                       
    },[recipes])



    // //component did mount
    // useEffect(() => {       
    //         const json = localStorage.getItem("localRecipes");
    //         const recipesFromJson = JSON.parse(json);
    //         setRecipes(recipesFromJson)
        
    // }, [])

    

    

   

    // const getRecipe = async () => {        
    //     const api_call = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);   
    //     const data = await api_call.json();
    //     setRecipes(data.hits);
    //     console.log(data.hits); 
    // }

    const updateQuery = e => {
        e.preventDefault();
        setQuery(search);
        setSearch("");
    }

    const updateSearch = (e) => {
        setSearch(e.target.value)               
    }

    return (
        <div>
            <form onSubmit={updateQuery} style={{marginBottom:"2rem"}}>
                <input 
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    className="form__input"
                />        
                <button className="form__button">Search</button>
            </form>
            <Recipes 
                recipes={recipes} 
                query={query}
                //query={"banana"}
            />            
        </div>
    )   
}


export default Form