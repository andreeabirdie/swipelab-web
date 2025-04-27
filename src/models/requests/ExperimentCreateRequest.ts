export interface ExperimentCreateRequest {
    dateOfBirth: string; // DateOnly -> string (ISO format like 'YYYY-MM-DD')
    gender: number;
    interestedIn: number;
    minAge: number;
    maxAge: number;
    ethnicity: string;
    countryOfResidency: string;
    usageOfDatingApps: number;
    knownDatingApps: number[];
    relationshipStatus: number;
}