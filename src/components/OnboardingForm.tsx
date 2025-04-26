import {Formik, Form} from 'formik';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Slider,
    InputLabel,
    FormControl,
    Box,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
} from '@mui/material';
import strings from '../strings.json';
import React, {useEffect, useRef, useState} from 'react';
import {DatingApps} from "../models/enums/DatingApps.ts";
import {Ethnicity} from '../models/enums/Ethnicity.ts';
import {Country} from "../models/enums/Country.ts";
import {UsageOfDatingApps} from "../models/enums/UsageOfDatingApps.ts";
import {InterestedInGender} from "../models/enums/InterestedInGender.ts";
import {RelationshipStatus} from "../models/enums/RelationshipStatus.ts";
import {Gender} from "../models/enums/Gender.ts";
// import * as Yup from 'yup';
// import { differenceInYears } from 'date-fns';

const initialValues = {
    dateOfBirth: '',
    ethnicity: '',
    otherEthnicity: '',
    countryOfResidence: '',
    gender: '',
    relationshipStatus: '',
    interestedInGender: '',
    ageRange: [18, 30],
    experience: '',
    knownDatingApps: [] as string[],
};

// const validationSchema = Yup.object({
//     dateOfBirth: Yup.string()
//         .required('Required')
//         .test('is-18', 'Unfortunately, you are not eligible', (value) => {
//             if (!value) return false;
//             return differenceInYears(new Date(), new Date(value)) >= 18;
//         }),
//     ethnicity: Yup.string().required('Required'),
//     otherEthnicity: Yup.string().when('ethnicity', {
//         is: (val: string) => val === Ethnicity.Other,
//         then: Yup.string().required('Required'),
//         otherwise: Yup.string(),
//     }),
//     countryOfResidence: Yup.string().required('Required'),
//     gender: Yup.string().required('Required'),
//     relationshipStatus: Yup.string().required('Required'),
//     interestedInGender: Yup.string().required('Required'),
//     ageRange: Yup.array().required('Required'),
//     experience: Yup.string()
//         .required('Required')
//         .notOneOf([UsageOfDatingApps.NeverUsed], 'Unfortunately, you are not eligible'),
//     knownDatingApps: Yup.array().required('Required'),
// });

export function OnboardingForm() {
    const otherEthnicityRef = useRef<HTMLInputElement>(null);

    const [ethnicity, setEthnicity] = useState('')

    useEffect(() => {
        if (ethnicity === Ethnicity.Other) {
            otherEthnicityRef.current?.focus();
        }
    }, [ethnicity]);

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Submitted', values);
            }}
        >
            {({values, handleChange, setFieldValue}) => (
                <Form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={3}
                        maxWidth="500px"
                        margin="0 auto"
                        padding={2}
                    >
                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_intro_to_experiment}</Box>
                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_data_disclaimer}</Box>
                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_honesty_disclaimer}</Box>
                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_preferences_disclaimer}</Box>


                        <TextField
                            fullWidth
                            label={strings.onboarding_date_of_birth_question}
                            name="dateOfBirth"
                            type="date"
                            slotProps={{inputLabel: {shrink: true}}}
                            value={values.dateOfBirth}
                            onChange={handleChange}
                            // error={Boolean(errors.dateOfBirth && touched.dateOfBirth)}
                            // helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                        />

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_ethnicity_question}</Box>
                        <FormControl fullWidth>
                            <RadioGroup
                                aria-labelledby="ethnicity-group"
                                name="ethnicity"
                                value={values.ethnicity}
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
                                {Object.values(Ethnicity).map((ethnicity) => {
                                    if (ethnicity === Ethnicity.Other) {
                                        return (
                                            <Box key={ethnicity} sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 1, // spacing between radio and text field
                                            }}>
                                                <FormControlLabel
                                                    value={ethnicity}
                                                    control={<Radio/>}
                                                    label={ethnicity}
                                                    sx={{mr: 1}}
                                                />
                                                <TextField
                                                    inputRef={otherEthnicityRef}
                                                    name="otherEthnicity"
                                                    value={values.otherEthnicity}
                                                    onChange={handleChange}
                                                    size="small"
                                                    disabled={values.ethnicity !== Ethnicity.Other}
                                                    sx={{flexGrow: 1}}
                                                />
                                            </Box>
                                        );
                                    } else {
                                        return (
                                            <FormControlLabel
                                                key={ethnicity}
                                                value={ethnicity}
                                                control={<Radio/>}
                                                label={ethnicity}
                                            />
                                        );
                                    }
                                })}
                            </RadioGroup>
                        </FormControl>

                        {/* Country of Residence */}
                        <FormControl fullWidth>
                            <InputLabel
                                id="onboarding-select-country">{strings.onboarding_residence_country_label}</InputLabel>
                            <Select
                                labelId="onboarding-select-country"
                                label={strings.onboarding_residence_country_label}
                                name="countryOfResidence"
                                value={values.countryOfResidence}
                                onChange={handleChange}
                            >
                                {Object.values(Country).map((country) => (
                                    <MenuItem key={country} value={country}>
                                        {country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Gender */}
                        <FormControl fullWidth>
                            <InputLabel id="onboarding-select-gender">{strings.onboarding_gender_label}</InputLabel>
                            <Select
                                labelId="onboarding-select-gender"
                                label={strings.onboarding_gender_label}
                                name="gender"
                                value={values.gender}
                                onChange={handleChange}
                            >
                                {Object.values(Gender).map((gender) => (
                                    <MenuItem key={gender} value={gender}>
                                        {gender}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Relationship Status */}
                        <FormControl fullWidth>
                            <InputLabel
                                id="onboarding-select-relationship-status">{strings.onboarding_relationship_label}</InputLabel>
                            <Select
                                labelId="onboarding-select-relationship-status"
                                label={strings.onboarding_relationship_label}
                                name="relationshipStatus"
                                value={values.relationshipStatus}
                                onChange={handleChange}
                            >
                                {Object.values(RelationshipStatus).map((relationshipStatus) => (
                                    <MenuItem key={relationshipStatus} value={relationshipStatus}>
                                        {relationshipStatus}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Note */}
                        <Box textAlign="justify">{strings.onboarding_relationship_note}</Box>

                        {/* Interested In Gender */}
                        <FormControl fullWidth>
                            <InputLabel
                                id="onboarding-select-interested-gender">{strings.onboarding_interested_in_gender_label}</InputLabel>
                            <Select
                                labelId="onboarding-select-interested-gender"
                                label={strings.onboarding_interested_in_gender_label}
                                name="interestedInGender"
                                value={values.interestedInGender}
                                onChange={handleChange}
                            >
                                {Object.values(InterestedInGender).map((interestedInGender) => (
                                    <MenuItem key={interestedInGender} value={interestedInGender}>
                                        {interestedInGender}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Age Range Slider */}
                        <Box width="80%" mt={1}>
                            <Box textAlign="center" className="on-surface-text" mb={5}>
                                {strings.onboarding_ages_question}
                            </Box>

                            <Slider
                                value={values.ageRange}
                                onChange={(_, newValue) => setFieldValue('ageRange', newValue)}
                                valueLabelDisplay="on"
                                valueLabelFormat={(value) => value == 50 ? `${value}+` : value}
                                min={18}
                                max={50}
                                color='primary'
                            />
                        </Box>

                        {/* Dating Experience */}
                        <FormControl fullWidth>
                            <InputLabel
                                id="onboarding-select-experience">{strings.onboarding_dating_experience_question}</InputLabel>
                            <Select
                                labelId="onboarding-select-experience"
                                label={strings.onboarding_dating_experience_question}
                                name="experience"
                                value={values.experience}
                                onChange={handleChange}
                            >
                                {Object.values(UsageOfDatingApps).map((experience) => (
                                    <MenuItem key={experience} value={experience}>
                                        {experience}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Dating Apps Picker */}
                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_dating_apps_question}</Box>

                        {/* Dating Apps Picker */}
                        <FormControl fullWidth>
                            <FormGroup
                                row
                                sx={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {Object.values(DatingApps).map((app) => (
                                    <FormControlLabel
                                        key={app}
                                        control={
                                            <Checkbox
                                                checked={values.knownDatingApps.includes(app)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        if (app === DatingApps.None) {
                                                            // If 'None' is selected, clear all other selections
                                                            setFieldValue('knownDatingApps', [DatingApps.None]);
                                                        } else {
                                                            // Add selected app and remove 'None' if it was selected
                                                            setFieldValue('knownDatingApps', [
                                                                ...values.knownDatingApps.filter(a => a !== DatingApps.None),
                                                                app,
                                                            ]);
                                                        }
                                                    } else {
                                                        // Remove the unchecked app
                                                        setFieldValue('knownDatingApps', values.knownDatingApps.filter(a => a !== app));
                                                    }
                                                }}
                                            />
                                        }
                                        label={app}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>

                        {/* Submit Button */}
                        <Button variant="contained" color="primary" type="submit">
                            {strings.onboarding_next_button_label}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}