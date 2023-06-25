'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { ReactNode, useEffect, useState } from 'react'


export function Providers({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }
    return <ThemeProvider>
        <div className={`them ${theme}`} >
            {children}
        </div>
    </ThemeProvider>
}