import React from 'react';
import ProfileSectionContent from "./ProfileSectionContent.tsx";
import ProfileTag from "./ProfileTag.tsx";

type ProfileSectionProps = {
    title: string;
    values: string[];
}

const ProfileSection: React.FC<ProfileSectionProps> = ({title, values}) => {
    return (
        <ProfileSectionContent title={title} content=
            {values.map((value, idx) => (
                <ProfileTag key={idx} tag={value}/>
            ))}/>
    );
};

export default ProfileSection;
