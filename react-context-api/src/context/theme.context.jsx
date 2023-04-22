// src/context/theme.context.js

import { createContext } from "react";

const ThemeContext = createContext();


// CREATE A WRAPPER COMPONENT
function ThemeProviderWrapper(props) {

  return (
    <ThemeContext.Provider value={"dark"}>
        {props.children}
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProviderWrapper };   // <== UPDATE
