import React, { useContext } from "react";
import { RoomsFilter } from "./RoomsFilter";
import { RoomsList } from "./RoomsList";
import { Loading } from "./Loading";
import { RoomContext } from "../context";

export const RoomsContainer = () => {
  const value = useContext(RoomContext);
  const { loading, sortedRooms, rooms } = value;

  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </div>
  );
};


