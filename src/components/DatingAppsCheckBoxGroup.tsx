import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {DatingApps} from "../models/enums/DatingApps.ts";
import React from "react";

export function renderDatingAppsCheckboxGroup({name, label, values, setFieldValue, options, errors, touched}: any) {
    return (
        <FormControl fullWidth error={Boolean(errors[name] && touched[name])}>
            <Box mb={3} textAlign="center" className="on-surface-text">{label}</Box>
            <FormGroup row sx={{justifyContent: 'center', alignItems: 'center'}}>
                {options.map((option: string) => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                checked={values[name].includes(option)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        if (option === DatingApps.None) {
                                            setFieldValue(name, [DatingApps.None]);
                                        } else {
                                            setFieldValue(name, [
                                                ...values[name].filter((a: string) => a !== DatingApps.None),
                                                option,
                                            ]);
                                        }
                                    } else {
                                        setFieldValue(name, values[name].filter((a: string) => a !== option));
                                    }
                                }}
                            />
                        }
                        label={option}
                    />
                ))}
            </FormGroup>
            <FormHelperText>{touched[name] && errors[name]}</FormHelperText>
        </FormControl>
    );
}