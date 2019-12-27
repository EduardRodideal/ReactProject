import React, {useState, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

const Shop = () => {
  useEffect(() => {
    fetchItems();
  },[]);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
    const items = await data.json();
    setItems(items.data)
  }

  let counter = 0;

  return (
    <div className="App">
      {items.map(data =>(
        <h1 key={data.itemId}>
          <Link to={`/shop/${counter++}`}>
            {data.item.name}
          </Link>
        </h1>
      ))}
    </div>
  );
}

// function Shop() {

//   useEffect(() => {
//       fetchItems();
//   }, []);

//   const [items, setItems] = useState([]);


//   const fetchItems = async () => {
//     const data = await fetch(
//       'https://fortnite-api.theapinetwork.com/store/get');
//     const items = await data.json();
//     console.log(items.data);
//     setItems(items.data);
//   }

//   let counter = 0;

  

//   return (
//     <div className="App">
//       {items.map(data => (
//         <h1 key={data.itemId}> 
//           <Link to={`/shop/${counter++}`}>{data.item.name}</Link>
//         </h1>        
//       ))}      
//     </div>
//   );
// }

export default Shop;
