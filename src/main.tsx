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
import FinalFormPage from "./pages/FinalFormPage";

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
                    <Route path="/tests/final-form" element={<FinalFormPage experimentId={'65b5ed55-b3c1-4ea7-a04d-070a22becc58'}/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App/>);
