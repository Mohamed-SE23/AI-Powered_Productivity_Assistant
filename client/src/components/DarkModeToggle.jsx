import { FaMoon } from 'react-icons/fa'
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleDarkMode } from '../app/darkMode';


export default function DarkModeToggle() {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectTheme);

  // toggle darkMode function

  const handleClick = () => {
    dispatch(toggleDarkMode());
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-colors`}
    >
      {darkMode ? (
        <MdOutlineLightMode className="text-yellow-500 w-6 h-6" />
      ) : (
        <FaMoon className="text-gray-900 bg-gray-100 p-2 rounded-full -rotate-[20deg] w-8 h-8" />
      )}
    </button>
  )
}
