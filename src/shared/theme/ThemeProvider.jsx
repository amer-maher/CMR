import { createContext, useEffect, useMemo, useState } from 'react'

const ThemeContext = createContext(null)

const STORAGE_KEY = 'crm_theme'

function applyThemeClass(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

function getInitialTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'dark' || saved === 'light') return saved
  const prefersDark =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
  return prefersDark ? 'dark' : 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyThemeClass(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(() => {
    const toggleTheme = () =>
      setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    return { theme, setTheme, toggleTheme }
  }, [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { ThemeContext }

