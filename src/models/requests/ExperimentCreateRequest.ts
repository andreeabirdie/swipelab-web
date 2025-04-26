import {Gender} from "../enums/Gender";
import {UsageOfDatingApps} from "../enums/UsageOfDatingApps";
import {DatingApps} from "../enums/DatingApps";
import {RelationshipStatus} from "../enums/RelationshipStatus";

export interface ExperimentCreateRequest {
    dateOfBirth: string; // DateOnly -> string (ISO format like 'YYYY-MM-DD')
    gender: Gender;
    interestedIn: Gender;
    minAge: number;
    maxAge: number;
    height: number;
    ethnicity: string;
    countryOfResidency: string;
    usageOfDatingApps: UsageOfDatingApps;
    knownDatingApps: DatingApps[];
    relationshipStatus: RelationshipStatus;
}
