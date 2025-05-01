import {DatingProfile} from "./DatingProfile.ts";

export interface CardInfo {
    profile: DatingProfile,
    isFeedbackCard: boolean
    userLiked: boolean | null
}