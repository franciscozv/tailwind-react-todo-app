import React, { useEffect, useState } from 'react'
import MoonIcon from '../components/icon/MoonIcon'
import SunIcon from './icon/SunIcon'
const initialStateDarkMode = localStorage.getItem('theme') === 'dark';
const Header = () => {
  const [darkMode, setDarkMode] = useState(initialStateDarkMode);
  const handleClickToggleTheme = () => {
    setDarkMode(!darkMode);
  }
  useEffect(() => {
    if(darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])
  return (
    <header className="container mx-auto px-4 pt-8 md:max-w-xl">
        <div className="flex justify-between">
          <h1 className=" text-3xl uppercase text-white font-semibold tracking-[0.3em]">Todo</h1>
          <button onClick={handleClickToggleTheme}>
            {
            
            darkMode ? <SunIcon/>:<MoonIcon />
            }
            
            
          </button>
        </div>
      </header>
  )
}

export default Header