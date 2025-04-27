import strings from "../strings.json"
import {Experiment} from "../models/Experiment.ts";
import React from "react";

type ThankYouPageProps = {
    experiment: Experiment
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({experiment}) => {
    return <div>
        <h1>{strings.thank_you_title}</h1>
        <h2>{strings.thank_you_info}</h2>
        <h2>{strings.thank_you_participant_id + experiment.experimentId}</h2>
    </div>;
};

export default ThankYouPage