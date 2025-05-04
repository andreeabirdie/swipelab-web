import React, {Ref} from "react";
import {FeedbackAnswers} from "../models/FeedbackAnswers.ts";
import * as Yup from "yup";
import {Box, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import {Form, Formik, FormikProps} from "formik";
import strings from "../strings.json";

type FeedbackFormProps = {
    profileId: string;
    feedbackPrompts: string[],
    userLiked: boolean | null,
    onSubmitForm: (changedOpinion: boolean, answers: Record<string, string>) => void,
    formRef: Ref<FormikProps<FeedbackAnswers>>;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({profileId, feedbackPrompts, userLiked, onSubmitForm, formRef}) => {
    const promptKeys = feedbackPrompts.map((_, idx) => `prompt_${idx}_${profileId}`);

    const initialValues: FeedbackAnswers = {
        promptsAnswers: promptKeys.reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {} as Record<string, string>),
        changedOpinion: false
    };

    const validationSchema = Yup.object({
        promptsAnswers: Yup.object(
            promptKeys.reduce((acc, key) => {
                acc[key] = Yup.string().required(strings.form_required).max(500, 'Max 500 characters');
                return acc;
            }, {} as Record<string, Yup.StringSchema>)
        ),
        changedOpinion: Yup.boolean().required()
    });

    const switchQuestion = userLiked ? "Would you like to change your swipe option?" : `You previously ${userLiked ? 'liked' : 'disliked'} this profile. Would you like to change your answer?`

    return (
        <Formik
            key={`${profileId}-form`}
            innerRef={formRef}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const remappedAnswers: Record<string, string> = {};
                feedbackPrompts.forEach((prompt, idx) => {
                    const key = `prompt_${idx}_${profileId}`;
                    remappedAnswers[prompt] = values.promptsAnswers[key];
                });
                onSubmitForm(values.changedOpinion, remappedAnswers);
            }}
        >
            {({values, handleChange, errors, touched}) => (
                <Form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={3}
                    >
                        <Typography textAlign="justify" variant="subtitle2">{strings.feedback_info}</Typography>
                        {feedbackPrompts.map((prompt, index) => {
                            const key = `prompt_${index}_${profileId}`;
                            return (
                                <Box width='100%' key={key}>
                                    <Typography mb={3} textAlign="justify" variant="body1"><b>{prompt}</b></Typography>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={4}
                                        name={`promptsAnswers.${key}`}
                                        value={values.promptsAnswers[key]}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val.length <= 500) {
                                                handleChange(e);
                                            }
                                        }}
                                        error={Boolean(errors.promptsAnswers?.[key] && touched.promptsAnswers?.[key])}
                                        helperText={errors.promptsAnswers?.[key] && touched.promptsAnswers?.[key] ? errors.promptsAnswers?.[key] : ''}
                                    />
                                    <Typography variant="caption" align="right" display="block">
                                        {values.promptsAnswers[key]?.length || 0}/500
                                    </Typography>
                                </Box>
                            );
                        })}

                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography variant="body1"><b>{switchQuestion}</b></Typography>

                            <FormControlLabel
                                sx={{ '& .MuiFormControlLabel-label': { minWidth: '2em' } }}
                                control={
                                    <Switch
                                        name="changedOpinion"
                                        checked={values.changedOpinion}
                                        onChange={handleChange}
                                    />
                                }
                                label={values.changedOpinion ? strings.feedback_yes : strings.feedback_no }
                            />
                        </Box>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default FeedbackForm;
