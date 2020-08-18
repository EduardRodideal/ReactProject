import React, { useContext } from "react";
import {SearchContext} from "./context/searchContext";

//Material UI stuff
import Brightness4TwoToneIcon from "@material-ui/icons/Brightness4TwoTone";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export const DarkWhiteMode = () => {
  const { dark, setDark } = useContext(SearchContext);

  //switches between dark and light mode
  const handleClick = () => {
    const mode = dark === "dark" ? "light" : "dark";
    
    setDark(mode);
  };

  return (
    <Tooltip title="Toggle dark/light theme">
      <IconButton onClick={handleClick}  aria-label="toggle theme">
        <Brightness4TwoToneIcon className="white-color"  />
      </IconButton>
    </Tooltip>
  );
};