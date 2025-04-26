import React from "react";
import {useThankYouViewModel} from "../hooks/useThankYouViewModel.ts";
import {ErrorCard} from "../components/ErrorCard.tsx";

const ThankYouPage: React.FC = () => {
    const uiState = useThankYouViewModel();

    if (uiState.status === 'loading') return <p>Loading...</p>;
    if (uiState.status === 'error') return <ErrorCard />;

    return <div>
        <h1>Thank you for your participation!</h1>
        <h2>Below is your participant id. Please save this if you wish to withdraw from the study.
            You can contact us at pbh469@alumni.ku.dk or zbv742@alumni.ku.dk if you want to withdraw or have any
            questions!</h2>
        <h2>Your participant id: {uiState.experimentId}</h2>
    </div>;
};

export default ThankYouPage