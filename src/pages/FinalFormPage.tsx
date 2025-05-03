import React, {useEffect, useState} from "react";
import {Question} from "../models/Question";
import interactionService from "../services/InteractionService";
import {useFormik} from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {QuestionAnswerItemRequest} from "../models/requests/QuestionAnswerItemRequest";
import ThankYouPage from "./ThankYouPage";
import LoadingContent from "../components/LoadingContent";
import SelectField from "../components/SelectField";
import {ErrorCard} from "../components/ErrorCard";
import Logger from "../utils/logger";
import strings from "../strings.json";
import {Box} from "@mui/material";

type FinalFormProps = {
    experimentId: string
}
const FinalFormPage: React.FC<FinalFormProps> = ({experimentId}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const fetchQuestions = async () => {
        try {
            const fetchedQuestions = await interactionService.getFinalQuestions(experimentId);
            Logger.info(`Successfully retrieved final questions for experiment ${experimentId}`, {experimentId: experimentId});
            setQuestions(fetchedQuestions);
        } catch (error) {
            Logger.error(`Failed to fetch questions for experiment ${experimentId}`, {experimentId: experimentId});
            setIsError(true);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchQuestions().then(_ => {
        });
    }, [experimentId]);

    const formik = useFormik({
        initialValues: {
            answers: {} as Record<number, string>,
        },
        validationSchema: Yup.object().shape({
            answers: Yup.object().test(
                "individual-answers",
                "",
                function (answers: Record<number, string>) {
                    if (!questions) return false;
                    const errors: Record<string, string> = {};
                    questions.forEach((q) => {
                        if (!answers || !answers[q.questionNumber] || answers[q.questionNumber].trim() === "") {
                            errors[q.questionNumber] = "Required";
                        }
                    });
                    if (Object.keys(errors).length > 0) {
                        throw this.createError({path: "answers", message: errors});
                    }
                    return true;
                }
            ),
        }),
        onSubmit: async (values, {setSubmitting, validateForm}) => {
            const formErrors = await validateForm();
            if (Object.keys(formErrors).length > 0) {
                setSubmitting(false);
                return;
            }

            const payload: QuestionAnswerItemRequest[] = Object.entries(values.answers).map(([key, value]) => ({
                questionNumber: Number(key),
                answer: value,
            } as QuestionAnswerItemRequest));

            try {
                setLoading(true);
                await interactionService.completeExperiment(experimentId, payload);
                Logger.info(`User finalized the final form for experiment${experimentId}`, {experimentId: experimentId});
                setLoading(false);
                setSubmitted(true);
            } catch (error) {
                Logger.error(`Failed to save final form answeres for experiment ${experimentId}`, {experimentId: experimentId});
                setIsError(true);
            }
        },
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false,
        validateOnMount: true
    });

    if (loading) {
        return <LoadingContent loadingStrings={null}/>;
    }

    if (submitted) {
        return <ThankYouPage experimentId={experimentId}/>;
    }

    if (!questions || questions.length === 0 || isError) {
        return <ErrorCard/>
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={3}
                maxWidth="500px"
                margin="0 auto"
                padding={2}
            >
                <div>{strings.final_form_title}</div>
                {questions.map((question, index) => {
                    const fieldName = `answers.${question.questionNumber}`;
                    const error = formik.errors.answers && typeof formik.errors.answers === 'object'
                        ? formik.errors.answers[question.questionNumber]
                        : undefined;

                    return (
                        <div key={question.questionNumber} style={{marginBottom: "10px"}}>
                            <h3>Question {index + 1}</h3>
                            <p>{question.text}</p>
                            {question.options && question.options.length > 0 ? (
                                <SelectField
                                    name={fieldName}
                                    label="Select an option"
                                    value={formik.values.answers[question.questionNumber] || ""}
                                    handleChange={formik.handleChange}
                                    errors={error}
                                    touched={Boolean(error)}
                                    options={question.options}
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    name={fieldName}
                                    label="Your answer"
                                    value={formik.values.answers[question.questionNumber] || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(error)}
                                    helperText={error}
                                />
                            )}
                        </div>
                    );
                })}

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </Box>
        </form>
    );
}

export default FinalFormPage;
