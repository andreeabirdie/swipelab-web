import React from 'react';

type ProfileSectionContentProps = {
    title: string;
    content: React.ReactNode;
}

const ProfileSectionContent: React.FC<ProfileSectionContentProps> = ({title, content}) => {
    return (
        <div className="w-full flex flex-col items-start">
            <h3 className="w-full text-base font-semibold text-on-surface text-left m-0">{title}</h3>
            <div className="profile-section">
                {content}
            </div>
        </div>
    );
};

export default ProfileSectionContent;
