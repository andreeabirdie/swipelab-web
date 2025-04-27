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
import { SelectField } from './SelectField.tsx';
import { renderEthnicityRadioGroup } from './EthnicityRadioGroup.tsx';
import {renderAgeSlider} from "./AgeSlider.tsx";
import {OnboardingAnswers} from "../models/OnboardingAnswers.ts";

const initialValues : OnboardingAnswers = {
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
                console.log('clicked submit');
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


                        <SelectField
                            name={'countryOfResidence'}
                            label={strings.onboarding_residence_country_label}
                            value={values.countryOfResidence}
                            handleChange={handleChange}
                            errors={errors.countryOfResidence}
                            touched={touched.countryOfResidence}
                            options={Object.values(Country)}
                        />

                        <SelectField
                            name={'gender'}
                            label={strings.onboarding_gender_label}
                            value={values.gender}
                            handleChange={handleChange}
                            errors={errors.gender}
                            touched={touched.gender}
                            options={Object.values(Gender)}
                        />

                        <SelectField
                            name={'relationshipStatus'}
                            label={strings.onboarding_relationship_label}
                            value={values.relationshipStatus}
                            handleChange={handleChange}
                            errors={errors.relationshipStatus}
                            touched={touched.relationshipStatus}
                            options={Object.values(RelationshipStatus)}
                        />

                        <Box textAlign="justify">{strings.onboarding_relationship_note}</Box>

                        <SelectField
                            name={'interestedInGender'}
                            label={strings.onboarding_interested_in_gender_label}
                            value={values.interestedInGender}
                            handleChange={handleChange}
                            errors={errors.interestedInGender}
                            touched={touched.interestedInGender}
                            options={Object.values(InterestedInGender)}
                        />

                        {renderAgeSlider({
                            value: values.ageRange,
                            onChange: (newValue: any) => setFieldValue('ageRange', newValue),
                            strings,
                        })}

                        <SelectField
                            name={'experience'}
                            label={strings.onboarding_dating_experience_question}
                            value={values.experience}
                            handleChange={handleChange}
                            errors={errors.experience}
                            touched={touched.experience}
                            options={Object.values(UsageOfDatingApps)}
                        />

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