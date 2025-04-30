import React from 'react';
import {Card, useTheme} from "@mui/material";

type ProfileTagProps = {
    tag: string;
    icon?: React.ReactNode | null
}

const ProfileTag: React.FC<ProfileTagProps> = ({tag, icon = null}) => {
    const theme = useTheme();

    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'spaceAround',
            padding: '6px',
            margin: '4px',
            gap: '4px',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,
            borderRadius: '10px',
            verticalAlign: 'center'
        }}>
            {icon}
            {tag}
        </Card>
    );
};

export default ProfileTag;
