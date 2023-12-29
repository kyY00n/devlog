import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { themeState } from '@/hook/state/themeState';

export const useDarkMode = () => {
  const [theme, setTheme] = useRecoilState(themeState);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
    document.body.className = newTheme;
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 테마 상태를 불러오고 적용
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
      document.body.className = localTheme;
    }
  }, []);

  return [theme, toggleTheme] as const;
};
