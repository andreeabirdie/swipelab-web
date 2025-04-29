
export interface DatingProfile {
    datingProfileId: string;
    datingProfileSetId: string;
    name: string;
    photoUrl: string;
    ethnicity: number;
    age: number;
    height: number;
    gender: number;
    lookingFor: number;
    drinking: number;
    smoking: number;
    kidsPreference: number;
    education: number;
    hobbies: string[];
    personalityPrompts: Record<string, string>;
}
