import React, { useContext, useState, useEffect } from "react";
import { RoomContext } from "../context";
import defaultBcg from "../images/room-1.jpeg";
import { StyledHero } from "../components/StyledHero";
import { Banner } from "../components/Banner";
import { Link } from "react-router-dom";

export const SingleRoom = props => {
  const { getRoom, rooms } = useContext(RoomContext);

  const [id, setId] = useState(props.match.params.id);
  const [image, setImage] = useState(defaultBcg);

  const room = getRoom(id);

  if (!room) {
    return (
      <div className="error">
        <h3>no such room could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }

  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    breakfast,
    pets,
    images
  } = room;

  const [mainImage, ...defaultImg] = images;

  return (
    <>
      <StyledHero img={mainImage || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : ${size} SQFT</h6>
            <h6>
              max capacity {capacity} {capacity < 2 ? "person" : "people"}
            </h6>
            <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>-{item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};
