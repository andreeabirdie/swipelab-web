import {Gender} from "./enums/Gender.ts";
import {ExperimentCreateRequest} from "./requests/ExperimentCreateRequest.ts";
import {InterestedInGender} from "./enums/InterestedInGender.ts";
import {RelationshipStatus} from "./enums/RelationshipStatus.ts";
import {UsageOfDatingApps} from "./enums/UsageOfDatingApps.ts";
import {DatingApps} from "./enums/DatingApps.ts";

export interface OnboardingAnswers {
    dateOfBirth: string; // DateOnly -> string (ISO format like 'YYYY-MM-DD')
    ethnicity: string;
    otherEthnicity: string;
    countryOfResidence: string;
    gender: string;
    relationshipStatus: string;
    interestedInGender: string;
    ageRange: [number, number];
    experience: string;
    knownDatingApps: string[];
}

export const mapOnboardingAnswersToParticipant = (answers: OnboardingAnswers): ExperimentCreateRequest => {
    return {
        dateOfBirth: answers.dateOfBirth,
        gender: Object.keys(Gender).indexOf(answers.gender),
        interestedIn: Object.keys(InterestedInGender).indexOf(answers.interestedInGender),
        minAge: answers.ageRange[0],
        maxAge: answers.ageRange[1],
        ethnicity: answers.ethnicity,
        countryOfResidency: answers.countryOfResidence,
        usageOfDatingApps: Object.keys(UsageOfDatingApps).indexOf(answers.experience),
        knownDatingApps: answers.knownDatingApps.map(app => Object.keys(DatingApps).indexOf(app)),
        relationshipStatus: Object.keys(RelationshipStatus).indexOf(answers.relationshipStatus)
    };
};