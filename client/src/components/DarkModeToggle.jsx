import { useState, useEffect } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function DarkModeToggle({className}) {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors ${className}`}
    >
      {darkMode ? (
        <FaSun className="text-yellow-400 w-6 h-6" />
      ) : (
        <FaMoon className="text-gray-900 w-6 h-6" />
      )}
    </button>
  )
}
