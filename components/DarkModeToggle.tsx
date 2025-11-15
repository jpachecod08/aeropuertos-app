'use client';

import { useState, useEffect } from 'react';

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Verificar preferencia del sistema o localStorage
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
    >
      {darkMode ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
  );
}