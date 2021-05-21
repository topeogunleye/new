import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { MoonIcon } from '@heroicons/react/solid';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none my-auto rounded-full w-10 h-10 grid place-items-center ml-2.5"
      style={{ background: theme.bg, color: theme.syntax }}
      title="Click to Change Theme"
      aria-label="Close to Change Theme"
    >
      <MoonIcon className="h-5 w-5" />
    </button>
  );
};

export default ThemeToggle;
