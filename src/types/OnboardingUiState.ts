import {Experiment} from "../models/Experiment.ts";

export type OnboardingUiState =
    | { status: 'loading' }
    | { status: 'content' }
    | { status: 'go_to_thank_you', experiment: Experiment }
    | { status: 'go_to_swiping', experiment: Experiment }
    | { status: 'error' };