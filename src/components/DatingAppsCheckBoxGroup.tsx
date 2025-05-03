import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText} from "@mui/material";
import {DatingApps} from "../models/enums/DatingApps.ts";
import React from "react";

type DatingAppsCheckBoxGroupProps = {
    name: string
    label: string
    values: string[]
    setFieldValue: (field: string, value: any) => void;
    errors: string[] | string | undefined
    touched: Boolean | undefined
    options: string[]
}

const DatingAppsCheckboxGroup: React.FC<DatingAppsCheckBoxGroupProps> = ({name, label, values, setFieldValue, errors, touched, options} ) => {
    return (
        <FormControl fullWidth error={Boolean(errors && touched)}>
            <Box mb={3} textAlign="center" className="on-surface-text">{label}</Box>
            <FormGroup row sx={{justifyContent: 'center', alignItems: 'center'}}>
                {options.map((option: string) => (
                    <FormControlLabel
                        key={option}
                        control={
                            <Checkbox
                                checked={values.includes(option)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        if (option === DatingApps[DatingApps.None]) {
                                            setFieldValue(name, [DatingApps[DatingApps.None]]);
                                        } else {
                                            setFieldValue(name, [
                                                ...values.filter((a: string) => a !== DatingApps[DatingApps.None]),
                                                option,
                                            ]);
                                        }
                                    } else {
                                        setFieldValue(name, values.filter((a: string) => a !== option));
                                    }
                                }}
                            />
                        }
                        label={option}
                    />
                ))}
            </FormGroup>
            <FormHelperText>{touched && errors}</FormHelperText>
        </FormControl>
    );
}

export default DatingAppsCheckboxGroup;