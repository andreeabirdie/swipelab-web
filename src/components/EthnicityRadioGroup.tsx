import {Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField} from "@mui/material";
import React from "react";
import { Ethnicity } from "../models/enums/Ethnicity";

export function renderEthnicityRadioGroup({
                                       name,
                                       value,
                                       setEthnicity,
                                       handleChange,
                                       errors,
                                       touched,
                                       otherEthnicityRef,
                                       ethnicityOptions,
                                   }: any) {
    return (
        <FormControl fullWidth error={Boolean(errors[name] && touched[name])}>
            <RadioGroup
                aria-labelledby="ethnicity-group"
                name={name}
                value={value}
                onChange={(e) => {
                    handleChange(e);
                    setEthnicity(e.target.value);
                }}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 2,
                    justifyItems: 'center',
                    alignItems: 'center',
                }}
            >
                {ethnicityOptions.map((ethnicity: Ethnicity) => {
                    if (ethnicity === Ethnicity.Other) {
                        return (
                            <Box
                                key={ethnicity}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1, // spacing between radio and text field
                                }}
                            >
                                <FormControlLabel
                                    value={ethnicity}
                                    control={<Radio />}
                                    label={ethnicity}
                                    sx={{ mr: 1 }}
                                />
                                <TextField
                                    inputRef={otherEthnicityRef}
                                    name="otherEthnicity"
                                    value={value}
                                    onChange={handleChange}
                                    size="small"
                                    disabled={value !== Ethnicity.Other}
                                    sx={{ flexGrow: 1 }}
                                />
                            </Box>
                        );
                    } else {
                        return (
                            <FormControlLabel
                                key={ethnicity}
                                value={ethnicity}
                                control={<Radio />}
                                label={ethnicity}
                            />
                        );
                    }
                })}
            </RadioGroup>
            <FormHelperText>{touched[name] && errors[name]}</FormHelperText>
        </FormControl>
    );
}
