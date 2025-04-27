import {Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField} from "@mui/material";
import React, {ChangeEvent} from "react";
import {Ethnicity} from "../models/enums/Ethnicity";

type EthnicityRadioGroupProps = {
    name: string,
    ethnicityValue: string,
    otherEthnicityValue: string,
    setEthnicity: (value: string) => void,
    handleChange: {(e: ChangeEvent<any>): void;
        <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;}
    errors: string | undefined,
    touched: boolean | undefined,
    otherEthnicityRef: React.RefObject<HTMLInputElement | null>,
    ethnicityOptions: Ethnicity[]
}

const EthnicityRadioGroup: React.FC<EthnicityRadioGroupProps> = ({
                                                                     name,
                                                                     ethnicityValue,
                                                                     otherEthnicityValue,
                                                                     setEthnicity,
                                                                     handleChange,
                                                                     errors,
                                                                     touched,
                                                                     otherEthnicityRef,
                                                                     ethnicityOptions,
                                                                 }) => {
    return (
        <FormControl fullWidth error={Boolean(errors && touched)}>
            <RadioGroup
                aria-labelledby="ethnicity-group"
                name={name}
                value={ethnicityValue}
                onChange={(e) => {
                    handleChange(e);
                    setEthnicity(e.target.value);
                }}
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
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
                                    gap: 1
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
                                    value={otherEthnicityValue}
                                    onChange={handleChange}
                                    size="small"
                                    disabled={ethnicity !== Ethnicity.Other}
                                    sx={{
                                        flexGrow: 1,
                                        minWidth: '150px'
                                    }}
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
                                sx={{
                                    flexShrink: 0,
                                }}
                            />
                        );
                    }
                })}
            </RadioGroup>
            <FormHelperText>{touched && errors}</FormHelperText>
        </FormControl>
    );
}

export default EthnicityRadioGroup;
