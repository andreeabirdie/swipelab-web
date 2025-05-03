import {InterestedInGender} from "../enums/InterestedInGender.ts";
import {Gender} from "../enums/Gender.ts";
import {UsageOfDatingApps} from "../enums/UsageOfDatingApps.ts";
import {DatingApps} from "../enums/DatingApps.ts";
import {RelationshipStatus} from "../enums/RelationshipStatus.ts";

export interface ExperimentCreateRequest {
    dateOfBirth: string; // DateOnly -> string (ISO format like 'YYYY-MM-DD')
    gender: Gender;
    interestedIn: InterestedInGender;
    minAge: number;
    maxAge: number;
    ethnicity: string;
    countryOfResidency: string;
    usageOfDatingApps: UsageOfDatingApps;
    knownDatingApps: DatingApps[];
    relationshipStatus: RelationshipStatus;
}