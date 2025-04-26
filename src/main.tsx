import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';
import './style.css'
import OnboardingPage from "./pages/OnboardingPage.tsx";
import SwipePage from "./pages/SwipePage.tsx";
import PostSwipePage from "./pages/PostSwipePage.tsx";
import ThankYou from "./pages/ThankYouPage.tsx";
import TestExperimentPage from "./pages/TestExperimentPage";
import CreateExperimentPage from "./pages/CreateExperimentPage";
import {createTheme, ThemeProvider } from "@mui/material";
import {themeOptions} from "./themeOptions.ts";

const App: React.FC = () => {
    const theme = createTheme(themeOptions)
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnboardingPage/>}/>
                    <Route path="/swipe" element={<SwipePage/>}/>
                    <Route path="/postswipe" element={<PostSwipePage/>}/>
                    <Route path="/thankyou" element={<ThankYou/>}/>
                    <Route path="/tests/experiment" element={<TestExperimentPage/>}/>
                    <Route path="/tests/create-experiment" element={<CreateExperimentPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App/>);
