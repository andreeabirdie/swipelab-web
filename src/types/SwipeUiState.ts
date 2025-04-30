import {Experiment} from "../models/Experiment.ts";
import {DatingProfile} from "../models/DatingProfile.ts";

export type SwipeUiState =
    | { status: 'loading' }
    | { status: 'content', profiles: DatingProfile[] }
    | { status: 'go_to_thank_you', experiment: Experiment }
    | { status: 'go_to_final_form', experiment: Experiment }
    | { status: 'error' };