import {Ethnicity} from "./enums/Ethnicity";
import {Gender} from "./enums/Gender";
import {Education} from "./enums/Education";
import {LookingFor} from "./enums/LookingFor";
import {ActivityOftenRate} from "./enums/ActivityOftenRate";
import {KidsPreference} from "./enums/KidsPreference";

export interface DatingProfile {
    datingProfileId: string;
    datingProfileSetId: string;
    name: string;
    photoUrl: string;
    ethnicity: Ethnicity;
    age: number;
    height: number;
    gender: Gender;
    lookingFor: LookingFor;
    drinking: ActivityOftenRate;
    smoking: ActivityOftenRate;
    kidsPreference: KidsPreference;
    education: Education;
    hobbies: string[];
    personalityPrompts: Record<string, string>;
}
