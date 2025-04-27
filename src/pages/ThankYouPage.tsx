import strings from "../strings.json"
import React from "react";

type ThankYouPageProps = {
    experimentId: String
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({experimentId}) => {
    return <div>
        <h1>{strings.thank_you_title}</h1>
        <h2>{strings.thank_you_info}</h2>
        <h2>{strings.thank_you_participant_id + experimentId}</h2>
    </div>;
};

export default ThankYouPage