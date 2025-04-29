import React from 'react';
import ProfileSectionContent from "./ProfileSectionContent.tsx";
import ProfileTag from "./ProfileTag.tsx";

type ProfileSectionWithIconProps = {
    title: string;
    values: string[],
    icons: React.ReactNode[],
}

const ProfileSectionWithIcon: React.FC<ProfileSectionWithIconProps> = ({title, values, icons}) => {
    return (
        <ProfileSectionContent title={title} content=
            {values.map((value, idx) => (
                value && (<ProfileTag key={idx} tag={value} icon={icons[idx]}/>)
            ))}/>
    );
};

export default ProfileSectionWithIcon;
