import React from "react";

export const themes = {
   dark: {
      color: 'white',
      background: 'black'
   },
   light: {
      color: 'black',
      background: 'white'
   }
};
let ThemeContext = null;
if(localStorage.getItem('get-theme') == null)
{
   ThemeContext = React.createContext(themes.light);
}else{
   ThemeContext = React.createContext(JSON.parse(localStorage.getItem('get-theme')));
}

export default ThemeContext;