import React from "react";
import {DatingProfile} from "../models/DatingProfile.ts";
import PersonalityPromptCard from "./PersonalityPromptCard.tsx";
import ProfileSectionWithIcon from "./ProfileSectionWithIcon.tsx";
import ProfileSection from "./ProfileSection.tsx";
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import CakeIcon from '@mui/icons-material/Cake';
import { GiBodyHeight } from "react-icons/gi";
import PublicIcon from '@mui/icons-material/Public';
import SchoolIcon from '@mui/icons-material/School';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import {Box, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {Ethnicity} from "../models/enums/Ethnicity.ts";
import {VicesPreference} from "../models/enums/VicesPreference.ts";
import {KidsPreference} from "../models/enums/KidsPreference.ts";
import {Education} from "../models/enums/Education.ts";
import {LookingFor} from "../models/enums/LookingFor.ts";

type ProfileCardProps = {
    profile: DatingProfile
}

const ProfileCard: React.FC<ProfileCardProps> = ({profile}) => {
    const profilePromptsKeys = Object.keys(profile.personalityPrompts)
    return (
        <Card sx={{ maxWidth: 350, maxHeight: 700, overflowY: 'scroll'}} >
            <CardMedia
                component="div"
                sx={{
                    height: 350,
                    width: 350,
                    position: 'relative',
                    backgroundImage: `url(${profile.photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)',
                        color: 'white',
                        padding: '8px',
                    }}
                >
                    <Typography variant="h6" align="left" sx={{paddingLeft: '4px'}}>
                        {profile.name}
                    </Typography>
                </Box>
            </CardMedia>
            <CardContent>

            {profilePromptsKeys.length > 0 && <PersonalityPromptCard
                prompt={profilePromptsKeys[0]}
                answer={profile.personalityPrompts[profilePromptsKeys[0]]}
            />}

            <ProfileSectionWithIcon
                title="About Me"
                values={[
                    `${profile.age}`,
                    `${profile.height / 100} m`,
                    Object.values(Ethnicity)[profile.ethnicity],
                    Object.values(Education)[profile.education],
                    Object.values(VicesPreference)[profile.smoking],
                    Object.values(VicesPreference)[profile.drinking],
                    Object.values(KidsPreference)[profile.kidsPreference]
                ]}
                icons={[
                    <CakeIcon />,
                    <GiBodyHeight size={24}/>,
                    <PublicIcon />,
                    <SchoolIcon />,
                    <SmokingRoomsIcon />,
                    <LocalBarIcon />,
                    <ChildFriendlyIcon />
                ]}
            />
                
            <ProfileSection
                title="Looking For"
                values={[Object.values(LookingFor)[profile.lookingFor]]}
            />

            {profilePromptsKeys.length > 1 && <PersonalityPromptCard
                prompt={profilePromptsKeys[1]}
                answer={profile.personalityPrompts[profilePromptsKeys[1]]}
            />}

            <ProfileSection title="Hobbies" values={profile.hobbies}/>

            {profilePromptsKeys.length > 2 &&
                profilePromptsKeys.slice(2).map((key, index) => (
                    <PersonalityPromptCard
                        key={index}
                        prompt={key}
                        answer={profile.personalityPrompts[key]}
                    />
                ))
            }
            </CardContent>
        </Card>
    );
}

export default ProfileCard;