import React from "react";
import {useThankYouViewModel} from "../hooks/useThankYouViewModel.ts";
import {ErrorCard} from "../components/ErrorCard.tsx";
import {LoadingContent} from "../components/LoadingContent.tsx";
import strings from "../strings.json"

const ThankYouPage: React.FC = () => {
    const uiState = useThankYouViewModel();

    if (uiState.status === 'loading') return <LoadingContent loadingStrings={null}/>;
    if (uiState.status === 'error') return <ErrorCard />;

    return <div>
        <h1>{strings.thank_you_title}</h1>
        <h2>{strings.thank_you_info}</h2>
        <h2>{strings.thank_you_participant_id + uiState.experimentId}</h2>
    </div>;
};

export default ThankYouPage