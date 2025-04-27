import {Experiment} from "../models/Experiment.ts";

export type SwipeUiState =
    | { status: 'loading' }
    | { status: 'content' }
    | { status: 'go_to_thank_you', experiment: Experiment }
    | { status: 'go_to_final_form', experiment: Experiment }
    | { status: 'error' };