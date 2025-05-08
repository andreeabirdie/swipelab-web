import {GenderMap} from "./enums/Gender.ts";
import {ExperimentCreateRequest} from "./requests/ExperimentCreateRequest.ts";
import {InterestedInGenderMap} from "./enums/InterestedInGender.ts";
import {RelationshipStatusMap} from "./enums/RelationshipStatus.ts";
import {UsageOfDatingAppsMap} from "./enums/UsageOfDatingApps.ts";
import {DatingAppsMap} from "./enums/DatingApps.ts";
import {Ethnicity} from "./enums/Ethnicity.ts";
import {Recruitment} from "./enums/Recuritment.ts";

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
    recruitment: string;
    otherRecruitment: string;
    onboardingConfidence: string;
    onboardingComfortable: string;
}

export const mapOnboardingAnswersToParticipant = (answers: OnboardingAnswers): ExperimentCreateRequest => {
    return {
        dateOfBirth: answers.dateOfBirth,
        gender: GenderMap.indexOf(answers.gender),
        interestedIn: InterestedInGenderMap.indexOf(answers.interestedInGender),
        minAge: answers.ageRange[0],
        maxAge: answers.ageRange[1],
        ethnicity: answers.ethnicity === Ethnicity.Other? (answers.otherEthnicity != '' ? answers.otherEthnicity : answers.ethnicity) : answers.ethnicity,
        countryOfResidency: answers.countryOfResidence,
        usageOfDatingApps: UsageOfDatingAppsMap.indexOf(answers.experience),
        knownDatingApps: answers.knownDatingApps.map(app => DatingAppsMap.indexOf(app)),
        relationshipStatus: RelationshipStatusMap.indexOf(answers.relationshipStatus),
        recruitmentSource: answers.recruitment === Recruitment.Other? (answers.otherRecruitment != '' ? answers.otherRecruitment : answers.recruitment) :  answers.recruitment,
        onboardingConfidence: answers.onboardingConfidence,
        onboardingComfortable: answers.onboardingComfortable
    };
};