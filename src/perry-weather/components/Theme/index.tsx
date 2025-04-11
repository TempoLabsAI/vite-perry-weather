import { StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles';
import { LightTheme } from './configs/LightTheme';
import { DarkTheme } from './configs/DarkTheme';
import { createContext } from 'react';
import { CssBaseline } from '@mui/material';
import useLocalStorage from '../../hooks/useLocalStorage';

export enum ThemeType {
    DARK = 'dark',
    LIGHT = 'light'
}

const ThemeMap: { [key in ThemeType]: Theme } = {
    dark: DarkTheme,
    light: LightTheme
};

type PWThemeContextType = {
    theme: ThemeType;
    setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
};

export const PWThemeContext = createContext<PWThemeContextType>({
    theme: ThemeType.DARK,
    setTheme: () => {}
});

type PWThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: ThemeType;
    persistTheme?: boolean;
};

export const PWThemeProvider = ({ children, defaultTheme = ThemeType.DARK, persistTheme = true }: PWThemeProviderProps) => {
    const [theme, setTheme] = useLocalStorage<ThemeType>('theme', defaultTheme, persistTheme);
    return (
        <PWThemeContext.Provider value={{ theme, setTheme }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={ThemeMap[theme]}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </PWThemeContext.Provider>
    );
};
