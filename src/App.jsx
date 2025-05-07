import React, { useEffect, useState } from 'react';
import Card from "./components/card/Card";
import Recipes from "./components/recipes/Recipes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="dark:bg-black min-h-screen">
      <button
        onClick={handleTheme}
        className="border p-2 rounded-md hover:bg-gray-200 dark:bg-white"
      >
        {isDark ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
      </button>
      <Recipes />
      <Card />
    </div>
  );
}

export default App;