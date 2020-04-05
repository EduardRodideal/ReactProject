import React, { useState } from "react";

export const NewSongForm = ({addSong}) => {
  const [title, setTitle] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();    
    addSong(title);
    setTitle("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="song">Song name</label>
      <input
        style={{ margin: "0 1rem" }}
        value={title}
        type="text"
        id="song"
        required
        onChange={e => setTitle(e.target.value)}
      />
      <input type="submit" value="add song" />
    </form>
  );
};
