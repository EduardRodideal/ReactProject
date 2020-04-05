import React from "react";

import "./Backdrop.css";

export const Backdrop = ({click}) => (
    <div className="backdrop" onClick={click} />
);