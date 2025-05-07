import {Box, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextField} from "@mui/material";
import React, {ChangeEvent} from "react";
import {Recruitment} from "../models/enums/Recuritment.ts";

type RecruitmentRadioGroupProps = {
    name: string,
    recruitmentValue: string,
    otherRecruitmentValue: string,
    setRecruitment: (value: string) => void,
    handleChange: {
        (e: ChangeEvent<any>): void;
        <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any> ? void : (e: string | ChangeEvent<any>) => void;
    }
    errors: string | undefined,
    touched: boolean | undefined,
    otherRecruitmentRef: React.RefObject<HTMLInputElement | null>,
    recruitmentOptions: Recruitment[]
}

const RecruitmentRadioGroup: React.FC<RecruitmentRadioGroupProps> = ({
                                                                     name,
                                                                     recruitmentValue,
                                                                     otherRecruitmentValue,
                                                                     setRecruitment,
                                                                     handleChange,
                                                                     errors,
                                                                     touched,
                                                                     otherRecruitmentRef,
                                                                     recruitmentOptions,
                                                                 }) => {
    return (
        <FormControl fullWidth error={Boolean(errors && touched)}>
            <RadioGroup
                aria-labelledby="recruitment-group"
                name={name}
                value={recruitmentValue}
                onChange={(e) => {
                    handleChange(e);
                    setRecruitment(e.target.value);
                }}
                sx={{
                    display: 'flex',
                    gap: 2,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}
            >
                {recruitmentOptions.map((recruitment: Recruitment) => {
                    if (recruitment === Recruitment.Other) {
                        return (
                            <Box
                                key={recruitment}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <FormControlLabel
                                    value={recruitment}
                                    control={<Radio/>}
                                    label={recruitment}
                                    sx={{mr: 1}}
                                />
                                <TextField
                                    inputRef={otherRecruitmentRef}
                                    name="otherRecruitment"
                                    value={otherRecruitmentValue}
                                    onChange={handleChange}
                                    size="small"
                                    disabled={recruitmentValue != Recruitment.Other}
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
                                key={recruitment}
                                value={recruitment}
                                control={<Radio/>}
                                label={recruitment}
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

export default RecruitmentRadioGroup;
