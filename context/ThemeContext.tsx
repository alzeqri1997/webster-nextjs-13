"use client"

import { ModeType, ThemeProviderType } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react"



export const ThemeContext = createContext<ThemeProviderType | null>(null);

export const ThemeProvider = ({children}: {children: ReactNode}) =>{
    const [mode, setMode] = useState<ModeType>("dark")

    const toggle = ()=> {
        setMode((prev)=> (prev === "dark" ? "light" : "dark"));
    }

    return (
        <ThemeContext.Provider value={{toggle, mode}} >
            <div className={`theme ${mode}`} > {children} </div>
        </ThemeContext.Provider>
    )
}
export function useThemeProvider(){
    return useContext(ThemeContext)
}