import React, {useState, useEffect} from 'react';
import '../App.css';


function ItemDetail({match}) {

  useEffect(() => {
    fetchItem();
    console.log(match.params.id)
  }, []);

  const [item, setItem] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const fetchItem = async () => {
    const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');      
    const items = await data.json();
    setItem(items.data)
    console.log(items.data[match.params.id].item.images.information);
    setImage(items.data[match.params.id].item.images.information);
    setName(items.data[match.params.id].item.name)
  }
  
  

  return (
    <div>
      <h1> {name}  </h1>
      <img src={image} />
    </div>
  );
}

export default ItemDetail;
