import React from "react";
import {FeedbackAnswers} from "../models/FeedbackAnswers.ts";
import * as Yup from "yup";
import {Box, Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import {Form, Formik} from "formik";
import strings from "../strings.json";
import {FeedbackPromptResponse} from "../models/FeedbackPromptsResponse.ts";

type FeedbackFormProps = {
    profileId: string;
    feedbackPrompts: FeedbackPromptResponse,
    onSubmitForm: (changedOpinion: boolean, answers: Record<string, string>) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({profileId, feedbackPrompts, onSubmitForm}) => {
    const promptKeys = feedbackPrompts.prompts.map((_, idx) => `prompt_${idx}_${profileId}`);

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
                acc[key] = Yup
                    .string()
                    .test('not-only-whitespace', 'Must be more than just whitespace', value => typeof value === 'string' && value.trim().length > 0)
                    .required(strings.form_required).max(500, 'Max 500 characters');
                return acc;
            }, {} as Record<string, Yup.StringSchema>)
        ),
        changedOpinion: Yup.boolean().required()
    });

    const switchQuestion = `You previously ${feedbackPrompts.previousSwipeState == 1 ? 'liked' : 'disliked'} this profile. Would you like to change your answer?`

    return (
        <Formik
            key={`${profileId}-form`}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const remappedAnswers: Record<string, string> = {};
                feedbackPrompts.prompts.forEach((prompt, idx) => {
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
                        {feedbackPrompts.prompts.map((prompt, index) => {
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
                                labelPlacement="bottom"
                                label={values.changedOpinion ? strings.feedback_yes : strings.feedback_no }
                            />
                        </Box>

                        <Button type="submit" variant="contained" color="primary">
                            {strings.feedback_submit}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default FeedbackForm;
