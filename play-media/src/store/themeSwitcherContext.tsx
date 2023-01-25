import { createContext, ReactElement, useCallback, useEffect, useState } from 'react';

const ThemeSwitcherContext = createContext({
  isDarkTheme: true,
  toggleThemeHandler: () => {},
});

interface ThemePropsInterface {
  children?: JSX.Element | JSX.Element[];
}

export const ThemeSwitcherContextProvider = (props: ThemePropsInterface): ReactElement => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const initialThemeHandler = useCallback(() => {
    if (isLocalStorageEmpty()) {
      localStorage.setItem('isDarkTheme', 'true');
      document!.querySelector('body')!.classList.add('dark');
      setIsDarkTheme(true);
    } else {
      const isDarkTheme: boolean = JSON.parse(localStorage.getItem('isDarkTheme')!);
      if (isDarkTheme) {
        document!.querySelector('body')!.classList.add('dark');
      }
      setIsDarkTheme(isDarkTheme);
    }
  }, []);

  useEffect(() => initialThemeHandler(), [initialThemeHandler]);

  const toggleThemeHandler = (): void => {
    const isDarkTheme: boolean = JSON.parse(localStorage.getItem('isDarkTheme')!);
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage();
  };

  const toggleDarkClassToBody = (): void => {
    document!.querySelector('body')!.classList.toggle('dark');
  };

  const isLocalStorageEmpty = (): boolean => {
    return !localStorage.getItem('isDarkTheme');
  };

  const setValueToLocalStorage = (): void => {
    localStorage.setItem('isDarkTheme', `${!isDarkTheme}`);
  };

  return (
    <ThemeSwitcherContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </ThemeSwitcherContext.Provider>
  );
};

export default ThemeSwitcherContext;
