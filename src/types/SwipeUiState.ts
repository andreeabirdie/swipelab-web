import {DatingProfile} from "../models/DatingProfile.ts";

export type SwipeUiState =
    | { status: 'loading' }
    | { status: 'content', profiles: DatingProfile[] }
    | { status: 'go_to_final_form'}
    | { status: 'error' };