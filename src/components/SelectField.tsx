import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react";

export function renderSelectField({ name, label, values, handleChange, errors, touched, options }: any) {
    return (
        <FormControl fullWidth error={Boolean(errors[name] && touched[name])}>
            <InputLabel id={`onboarding-select-${name}`}>{label}</InputLabel>
            <Select
                labelId={`onboarding-select-${name}`}
                label={label}
                name={name}
                value={values[name]}
                onChange={handleChange}
            >
                {options.map((option: string) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{touched[name] && errors[name]}</FormHelperText>
        </FormControl>
    );
}