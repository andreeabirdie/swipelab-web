import strings from "../strings.json"
import React from "react";

type ThankYouPageProps = {
    experimentId: String
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({experimentId}) => {
    return <div>
        <h2>{strings.thank_you_title}</h2>
        <h3>{strings.thank_you_info}</h3>
        <h3>{strings.thank_you_participant_id + experimentId}</h3>
    </div>;
};

export default ThankYouPage