import React from 'react';
import {Box, Card, useTheme} from "@mui/material";

type PersonalityPromptCardProps = {
    prompt: string;
    answer: string
}

const PersonalityPromptCard: React.FC<PersonalityPromptCardProps> = ({prompt, answer}) => {
    const theme = useTheme();
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '8px',
            marginTop: '8px',
            marginBottom: '8px',
            marginLeft: '4px',
            marginRight: '4px',
            gap: '2px',
            backgroundColor: theme.palette.primary.light
        }}>
            <Box textAlign="left"
                 fontSize='14px'
                 fontWeight={500}
                 className="on-primary-text">{`${prompt}...`}</Box>
            <Box textAlign="left"
                 className="on-primary-text"><i>{answer}</i></Box>
        </Card>
    );
};

export default PersonalityPromptCard;
