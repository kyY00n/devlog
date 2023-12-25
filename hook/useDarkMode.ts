import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | null;

export const useDarkMode = () => {
  const [theme, setTheme] = useState<Theme>(null);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 테마 상태를 불러오고 적용
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme;
    if (localTheme) {
      setTheme(localTheme);
      document.body.className = localTheme;
    }
  }, []);

  return [theme, toggleTheme] as const;
};
