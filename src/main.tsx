import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import './style.css'
import OnboardingPage from "./pages/OnboardingPage.tsx";
import SwipePage from "./pages/SwipePage.tsx";
import PostSwipePage from "./pages/PostSwipePage.tsx";
import ThankYou from "./pages/ThankYouPage.tsx";
import TestExperimentPage from "./pages/TestExperimentPage";
import CreateExperimentPage from "./pages/CreateExperimentPage";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<OnboardingPage />} />
                <Route path="/swipe" element={<SwipePage />} />
                <Route path="/postswipe" element={<PostSwipePage />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/tests/experiment" element={<TestExperimentPage/>}/>
                <Route path="/tests/create-experiment" element={<CreateExperimentPage/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;

const root = ReactDOM.createRoot(document.getElementById('app')!);
root.render(<App />);
