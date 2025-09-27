import React, {createContext,useContext} from 'react'
import {lightTheme} from '../theme'

const StyleContext = createContext()
export const useTheme = ()=> {
  const context = useContext(StyleContext)
  if (!context){
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({children})=> {
  const colors = lightTheme
  return (
    <StyleContext.Provider value={{ theme: colors }}>
      {typeof children === 'function' ? children(colors) : children}
    </StyleContext.Provider>
  )
}