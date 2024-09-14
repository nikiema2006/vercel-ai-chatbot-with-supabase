import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { useState } from 'react'
import { lightTheme, darkTheme } from '../themes'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(darkTheme)

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} toggleTheme={toggleTheme} />
    </ThemeProvider>
  )
}

export default MyApp