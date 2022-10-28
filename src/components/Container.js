import React from "react";
import {useState, useContext} from "react";
import ThemeContext from "../config/ThemeContext";

const Container = () => {
   const theme = useContext(ThemeContext);
   <div style={theme}>
      
   </div>
}
export default Container;