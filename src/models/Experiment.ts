import {ExperimentState} from "./enums/ExperimentState";

export interface Experiment {
    experimentId: string;
    participantId: string;
    state: ExperimentState;
    type: number;
    swipeCount: number;
    reflectionCount: number;
    datingProfileSetId: string;
}