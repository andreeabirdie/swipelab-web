import {ThemeOptions} from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

export const themeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#ad9bf6',
            dark: '#2f1276',
            contrastText: '#f3e5f5',
        },
        secondary: {
            main: '#2979ff',
        },
        background: {
            default: '#1b2240',
            paper: '#292f4d',
        },
        error: {
            main: '#b71c1c',
        },
        text: {
            primary: '#efeef1',
            secondary: '#ffebee',
        },
    },
};
