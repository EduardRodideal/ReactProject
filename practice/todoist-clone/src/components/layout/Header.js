import React from "react";
import { FaPizzaSlice } from "react-icons/fa";

export const Header = () => {
  return (
    <>
      <div className="row bg-danger">
        <div className="col-sm-3 bg-danger">
          <div className="logo">
            <img src="images/logo.png" alt="Todoist" />
          </div>
          <div className="settings">
              <ul>
                  <li>+</li>
                  <li>
                      FaPizzaSlice
                  </li>
              </ul>
          </div>
        </div>
      </div>
    </>
  );
};
