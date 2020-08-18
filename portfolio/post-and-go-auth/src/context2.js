import React, {createContext, useState} from "react";

export const SessionContext = createContext();

export const SessionContextProvider = ({children}) => {
    const [alert, setAlert] = useState(false);

    return (
        <SessionContext.Provider value={{alert, setAlert}}>
            {children}
        </SessionContext.Provider>
    )
} 