import React from 'react';
import {Link} from "react-router-dom";
import OnboardingForm from "../components/OnboardingForm.tsx";

const OnboardingPage : React.FC = () => (
    <>
        <ul>
            <li><Link to="/swipe">Go to Swipe page</Link></li>
            <li><Link to="/postswipe">Go to Post Swipe page</Link></li>
            <li><Link to="/thankyou">Go to Thank You page</Link></li>
        </ul>
        <OnboardingForm />
    </>
)

export default OnboardingPage