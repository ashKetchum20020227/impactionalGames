
import { createContext, useState } from "react";

export const ClientThemeContext = createContext({
    clientTheme: '',
    setClientTheme: (clientTheme) => {}
});


export const ClientThemeContextProvider = ({children}) => {
    const [clientTheme, setClientTheme] = useState('None')

    return (
        <ClientThemeContext.Provider value={{clientTheme, setClientTheme}}>
            {children}
        </ClientThemeContext.Provider>
    )
}