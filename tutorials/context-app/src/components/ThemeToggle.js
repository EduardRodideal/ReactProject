import React, { Component, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

// use context with classes
// export class ThemeToggle1 extends Component {
//   static contextType = ThemeContext;

//   render() {
//     const { toggleTheme } = this.context;
//     return <button onClick={toggleTheme}>Toggle the theme</button>;
//   }
// }

export const ThemeToggle = () => {
 const {toggleTheme} = useContext(ThemeContext);
  return (
    <button onClick={toggleTheme}>Toggle the theme</button>
  )
}
