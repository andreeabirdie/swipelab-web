import {Form, Formik} from 'formik';
import {Box, Button, TextField} from '@mui/material';
import strings from '../strings.json';
import React, {useEffect, useRef, useState} from 'react';
import {Ethnicity} from '../models/enums/Ethnicity.ts';
import {Country} from "../models/enums/Country.ts";
import {UsageOfDatingApps, UsageOfDatingAppsMap} from "../models/enums/UsageOfDatingApps.ts";
import {GenderMap} from "../models/enums/Gender.ts";
import * as Yup from 'yup';
import {differenceInYears, isAfter} from 'date-fns';
import SelectField from './SelectField.tsx';
import AgeSlider from "./AgeSlider.tsx";
import {OnboardingAnswers} from "../models/OnboardingAnswers.ts";
import DatingAppsCheckboxGroup from "./DatingAppsCheckBoxGroup.tsx";
import {RelationshipStatusMap} from "../models/enums/RelationshipStatus.ts";
import {InterestedInGenderMap} from "../models/enums/InterestedInGender.ts";
import {DatingAppsMap} from "../models/enums/DatingApps.ts";
import {Recruitment} from "../models/enums/Recuritment.ts";
import RecruitmentRadioGroup from "./RecruitmentRadioGroup.tsx";
import EthnicityRadioGroup from "./EthnicityRadioGroup.tsx";
import {questions} from "../models/Question.ts";

type OnboardingFormProps = {
    onSubmit: (answers: OnboardingAnswers) => void
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({onSubmit}) => {
    const otherEthnicityRef = useRef<HTMLInputElement | null>(null);
    const otherRecruitmentRef = useRef<HTMLInputElement | null>(null);

    const [ethnicity, setEthnicity] = useState('')
    const [recruitment, setRecruitment] = useState('')

    useEffect(() => {
        if (ethnicity === Ethnicity.Other) {
            otherEthnicityRef.current?.focus();
        }
    }, [ethnicity]);

    useEffect(() => {
        if (recruitment === Recruitment.Other) {
            otherRecruitmentRef.current?.focus();
        }
    }, [recruitment]);

    const validationSchema = Yup.object({
        dateOfBirth: Yup.string()
            .required(strings.form_required)
            .test('not-in-future', strings.onboarding_time_travel, (value) => {
                if (!value) return false;
                return !isAfter(new Date(value), new Date());
            })
            .test('is-18', strings.onboarding_error_invalid_participant, (value) => {
                if (!value) return false;
                return differenceInYears(new Date(), new Date(value)) >= 18;
            })
            .test('is-100', strings.onboarding_old, (value) => {
                if (!value) return false;
                return differenceInYears(new Date(), new Date(value)) <= 100;
            }),
        ethnicity: Yup.string().required(strings.form_required),
        countryOfResidence: Yup.string().required(strings.form_required),
        gender: Yup.string().required(strings.form_required),
        relationshipStatus: Yup.string().required(strings.form_required),
        interestedInGender: Yup.string().required(strings.form_required),
        ageRange: Yup.array().required(strings.form_required),
        experience: Yup.string()
            .required(strings.form_required)
            .notOneOf([UsageOfDatingAppsMap[UsageOfDatingApps.NeverUsed]], strings.onboarding_error_invalid_participant),
        knownDatingApps: Yup.array().min(1, strings.onboarding_one_box)
    });

    const today = new Date();
    const customDate = new Date(2005, today.getMonth(), today.getDate(), 12);

    const initialValues: OnboardingAnswers = {
        dateOfBirth: customDate.toISOString().split('T')[0],
        ethnicity: '',
        otherEthnicity: '',
        countryOfResidence: 'Denmark',
        gender: '',
        relationshipStatus: '',
        interestedInGender: '',
        ageRange: [20, 30],
        experience: '',
        knownDatingApps: [] as string[],
        recruitment: '',
        otherRecruitment: '',
        onboardingConfidence: '',
        onboardingComfortable: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                onSubmit(values)
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
                        <Box textAlign="center"
                             className="on-surface-text">If you have any questions you can contact us at <a href="mailto:swipelab.ku@gmail.com">swipelab.ku@gmail.com</a></Box>

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_ethnicity_question}</Box>

                        <EthnicityRadioGroup
                            name={'ethnicity'}
                            ethnicityValue={values.ethnicity}
                            otherEthnicityValue={values.otherEthnicity}
                            setEthnicity={setEthnicity}
                            handleChange={handleChange}
                            errors={errors.ethnicity}
                            touched={touched.ethnicity}
                            otherEthnicityRef={otherEthnicityRef}
                            ethnicityOptions={Object.values(Ethnicity)}
                        />

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
                            options={GenderMap}
                        />

                        <SelectField
                            name={'relationshipStatus'}
                            label={strings.onboarding_relationship_label}
                            value={values.relationshipStatus}
                            handleChange={handleChange}
                            errors={errors.relationshipStatus}
                            touched={touched.relationshipStatus}
                            options={RelationshipStatusMap}
                        />

                        <Box textAlign="justify">{strings.onboarding_relationship_note}</Box>

                        <SelectField
                            name={'interestedInGender'}
                            label={strings.onboarding_interested_in_gender_label}
                            value={values.interestedInGender}
                            handleChange={handleChange}
                            errors={errors.interestedInGender}
                            touched={touched.interestedInGender}
                            options={InterestedInGenderMap}
                        />

                        <AgeSlider
                            value={values.ageRange}
                            setFieldValue={setFieldValue}
                            label={strings.onboarding_ages_question}
                        />

                        <SelectField
                            name={'experience'}
                            label={strings.onboarding_dating_experience_question}
                            value={values.experience}
                            handleChange={handleChange}
                            errors={errors.experience}
                            touched={touched.experience}
                            options={UsageOfDatingAppsMap}
                        />

                        <DatingAppsCheckboxGroup
                            name={'knownDatingApps'}
                            label={strings.onboarding_dating_apps_question}
                            values={values.knownDatingApps}
                            setFieldValue={setFieldValue}
                            errors={errors.knownDatingApps}
                            touched={touched.knownDatingApps}
                            options={DatingAppsMap}
                        />

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_recruitment_question}</Box>

                        <RecruitmentRadioGroup
                            name={'recruitment'}
                            recruitmentValue={values.recruitment}
                            otherRecruitmentValue={values.otherRecruitment}
                            setRecruitment={setRecruitment}
                            handleChange={handleChange}
                            errors={errors.recruitment}
                            touched={touched.recruitment}
                            otherRecruitmentRef={otherRecruitmentRef}
                            recruitmentOptions={Object.values(Recruitment)}
                        />

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_confidence_question}</Box>

                        <SelectField
                            name={'onboardingConfidence'}
                            label={strings.onboarding_choose_an_option}
                            value={values.onboardingConfidence}
                            handleChange={handleChange}
                            errors={errors.onboardingConfidence}
                            touched={touched.onboardingConfidence}
                            options={questions.find(q => q.questionNumber === 6)?.options ?? ["1", "2", "3", "4", "5", "6", "7"]}
                        />

                        <Box textAlign="justify"
                             className="on-surface-text">{strings.onboarding_comfortable_question}</Box>

                        <SelectField
                            name={'onboardingComfortable'}
                            label={strings.onboarding_choose_an_option}
                            value={values.onboardingComfortable}
                            handleChange={handleChange}
                            errors={errors.onboardingComfortable}
                            touched={touched.onboardingComfortable}
                            options={questions.find(q => q.questionNumber === 7)?.options ?? ["1", "2", "3", "4", "5", "6", "7"]}
                        />

                        <Button variant="contained" type="submit" color="primary">
                            {strings.onboarding_next_button_label}
                        </Button>

                        <Box textAlign="justify"
                             className="version">{strings.version}</Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default OnboardingForm;