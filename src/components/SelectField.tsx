import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import React, {ChangeEvent} from "react";

type SelectFieldProps = {
    name: string
    label: string
    value: string
    handleChange: {(e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;}
    errors: string | undefined
    touched: Boolean | undefined
    options: string[]
}

export function SelectField({name, label, value, handleChange, errors, touched, options}: SelectFieldProps) {
    return (
        <FormControl fullWidth error={Boolean(errors && touched)}>
            <InputLabel id={`select-${name}`}>{label}</InputLabel>
            <Select
                labelId={`select-${name}`}
                label={label}
                name={name}
                value={value}
                onChange={(e) => { handleChange(e); }}
            >
                {options.map((option: string) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{touched && errors}</FormHelperText>
        </FormControl>
    );
}