import ReactDOM from "react-dom/client";
import React from 'react';
import './style.css'
import GraduatedPage from "./pages/GraduatedPage.tsx";
import {createTheme, ThemeProvider} from "@mui/material";
import {themeOptions} from "./themeOptions.ts";

const App: React.FC = () => {
    const theme = createTheme(themeOptions)
    return (
        <ThemeProvider theme={theme}>
            <GraduatedPage/>
            {/*<OnboardingPage/>*/}
        </ThemeProvider>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App/>);
