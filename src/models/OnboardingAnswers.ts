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