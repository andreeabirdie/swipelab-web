import React from 'react';
import {Box, Slider} from '@mui/material';

export function renderAgeSlider({value, onChange, strings,}: any) {
    return (
        <Box width="80%" mt={1}>
            <Box textAlign="center" className="on-surface-text" mb={5}>
                {strings.onboarding_ages_question}
            </Box>

            <Slider
                value={value}
                onChange={(_, newValue) => onChange(newValue)}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => value == 50 ? `${value}+` : value}
                min={18}
                max={50}
                color="primary"
            />
        </Box>
    );
}

