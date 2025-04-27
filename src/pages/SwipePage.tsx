import React from "react";
import {Experiment} from "../models/Experiment.ts";

type SwipePageProps = {
    experiment: Experiment
}

const SwipePage: React.FC<SwipePageProps> = ({experiment}) => {
    return <div>
        <h2>{`SwipePage for ${experiment.experimentId}`}</h2>
    </div>;
};

export default SwipePage