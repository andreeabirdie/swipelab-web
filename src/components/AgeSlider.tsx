import React from 'react';
import {Box, Slider} from '@mui/material';

type AgeSliderProps = {
    value: number[];
    setFieldValue: (field: string, value: any) => void;
    label: string;
}

const AgeSlider: React.FC<AgeSliderProps> = ({ value, setFieldValue, label }) => {
    return (
        <Box width="80%" mt={1}>
            <Box textAlign="center" className="on-surface-text" mb={5}>
                {label}
            </Box>

            <Slider
                value={value}
                onChange={(_, newValue) => setFieldValue('ageRange', newValue)}
                valueLabelDisplay="on"
                valueLabelFormat={(value) => value === 50 ? `${value}+` : value}
                min={18}
                max={50}
                color="primary"
            />
        </Box>
    );
};

export default AgeSlider;

