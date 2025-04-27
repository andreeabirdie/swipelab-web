import {Formik, Form} from 'formik';
import {TextField, Button, Box} from '@mui/material';
import strings from '../strings.json';
import React, {useEffect, useRef, useState} from 'react';
import {DatingApps} from "../models/enums/DatingApps.ts";
import {Ethnicity} from '../models/enums/Ethnicity.ts';
import {Country} from "../models/enums/Country.ts";
import {UsageOfDatingApps} from "../models/enums/UsageOfDatingApps.ts";
import {InterestedInGender} from "../models/enums/InterestedInGender.ts";
import {RelationshipStatus} from "../models/enums/RelationshipStatus.ts";
import {Gender} from "../models/enums/Gender.ts";
import * as Yup from 'yup';
import { differenceInYears } from 'date-fns';
import {renderDatingAppsCheckboxGroup} from "./DatingAppsCheckBoxGroup.tsx";
import { renderSelectField } from './SelectField.tsx';
import { renderEthnicityRadioGroup } from './EthnicityRadioGroup.tsx';
import {renderAgeSlider} from "./AgeSlider.tsx";

const initialValues = {
    dateOfBirth: '',
    ethnicity: '',
    otherEthnicity: '',
    countryOfResidence: '',
    gender: '',
    relationshipStatus: '',
    interestedInGender: '',
    ageRange: [20, 30],
    experience: '',
    knownDatingApps: [] as string[],
};

const validationSchema = Yup.object({
    dateOfBirth: Yup.string()
        .required('Required')
        .test('is-18', 'Unfortunately, you are not eligible', (value) => {
            if (!value) return false;
            return differenceInYears(new Date(), new Date(value)) >= 18;
        }),
    ethnicity: Yup.string().required('Required'),
    countryOfResidence: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    relationshipStatus: Yup.string().required('Required'),
    interestedInGender: Yup.string().required('Required'),
    ageRange: Yup.array().required('Required'),
    experience: Yup.string()
        .required('Required')
        .notOneOf([UsageOfDatingApps.NeverUsed], 'Unfortunately, you are not eligible'),
    knownDatingApps: Yup.array().min(1, 'At least one box must be ticked')
});

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
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log('Submitted', values);
            }}
        >
            {({values, handleChange, setFieldValue, errors, touched}) => (
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
                            error={Boolean(errors.dateOfBirth && touched.dateOfBirth)}
                            helperText={errors.dateOfBirth && touched.dateOfBirth ? errors.dateOfBirth : ''}
                        />

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_ethnicity_question}</Box>

                        {renderEthnicityRadioGroup({
                            name: 'ethnicity',
                            value: values.ethnicity,
                            setEthnicity,
                            handleChange,
                            errors,
                            touched,
                            otherEthnicityRef,
                            ethnicityOptions: Object.values(Ethnicity),
                        })}

                        {renderSelectField({
                            name: 'countryOfResidence',
                            label: strings.onboarding_residence_country_label,
                            values,
                            handleChange,
                            errors,
                            touched,
                            options: Object.values(Country),
                        })}

                        {renderSelectField({
                            name: 'gender',
                            label: strings.onboarding_gender_label,
                            values,
                            handleChange,
                            errors,
                            touched,
                            options: Object.values(Gender),
                        })}

                        {renderSelectField({
                            name: 'relationshipStatus',
                            label: strings.onboarding_relationship_label,
                            values,
                            handleChange,
                            errors,
                            touched,
                            options: Object.values(RelationshipStatus),
                        })}

                        <Box textAlign="justify">{strings.onboarding_relationship_note}</Box>

                        {renderSelectField({
                            name: 'interestedInGender',
                            label: strings.onboarding_interested_in_gender_label,
                            values,
                            handleChange,
                            errors,
                            touched,
                            options: Object.values(InterestedInGender),
                        })}

                        {renderAgeSlider({
                            value: values.ageRange,
                            onChange: (newValue: any) => setFieldValue('ageRange', newValue),
                            strings,
                        })}
                        
                        {renderSelectField({
                            name: 'experience',
                            label: strings.onboarding_dating_experience_question,
                            values,
                            handleChange,
                            errors,
                            touched,
                            options: Object.values(UsageOfDatingApps),
                        })}

                        {renderDatingAppsCheckboxGroup({
                            name: 'knownDatingApps',
                            label: strings.onboarding_dating_apps_question,
                            values,
                            setFieldValue,
                            options: Object.values(DatingApps),
                            errors,
                            touched,
                        })}

                        <Button variant="contained" color="primary" type="submit">
                            {strings.onboarding_next_button_label}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}