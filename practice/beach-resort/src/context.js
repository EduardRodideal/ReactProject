import React, { createContext, useState, useEffect } from "react";
import items from "./data";

export const RoomContext = createContext();

export const RoomContextProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");
  const [capacity, setCapasity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  useEffect(() => {
    let rooms = formatData(items);
    let featuredRooms = rooms.filter(room => room.featured === true);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));
    setRooms(rooms);
    setFeaturedRooms(featuredRooms);
    setSortedRooms(rooms);
    setLoading(false);
    setMaxPrice(maxPrice);
    setMaxSize(maxSize);
    setPrice(maxPrice);
  }, []);

  useEffect(() => {
    filterRooms();
  }, [
    pets,
    breakfast,
    maxSize,
    minSize,
    maxPrice,
    minPrice,
    price,
    capacity,
    type
  ]);

  const formatData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const getRoom = slug => {
    return rooms.find(room => room.slug === slug);
  };

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = event.target.name;

    name === "type" && setType(value);
    name === "capacity" && setCapasity(parseInt(value));
    name === "price" && setPrice(parseInt(value));
    name === "minSize" && setMinSize(parseInt(value));
    name === "maxSize" && setMaxSize(parseInt(value));
    name === "breakfast" && setBreakfast(value);
    name === "pets" && setPets(value);
  };

  const filterRooms = () => {
    let sortedRooms = rooms.filter(room => {
      if (type !== "all" && room.type !== type) {
        return false;
      }
      if (breakfast && !room.breakfast) {
        return false;
      }
      if (pets && !room.pets) {
        return false;
      }

      return (
        room.capacity >= capacity &&
        room.price <= price &&
        room.size >= minSize &&
        room.size <= maxSize &&
        room
      );
    });
    setSortedRooms(sortedRooms);
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        sortedRooms,
        featuredRooms,
        loading,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
        handleChange,
        getRoom
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
