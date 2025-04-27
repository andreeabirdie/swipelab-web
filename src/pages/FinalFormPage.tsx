import React, {useEffect, useState} from "react";
import {Question} from "../models/Question";
import interactionService from "../services/InteractionService";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import {QuestionAnswerItemRequest} from "../models/requests/QuestionAnswerItemRequest";
import ThankYouPage from "./ThankYouPage";
import {LoadingContent} from "../components/LoadingContent";
import {renderSelectField} from "../components/SelectField";
import strings from "../strings.json";
import {Country} from "../models/enums/Country";

type FinalFormProps = {
    experimentId: string
}
const FinalFormPage: React.FC<FinalFormProps> = ({experimentId}) => {
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await interactionService.getFinalQuestions(experimentId);
                setQuestions(fetchedQuestions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [experimentId]);

    const formik = useFormik({
        initialValues: {
            answers: {} as Record<number, string>,
        },
        validationSchema: Yup.object().shape({
            answers: Yup.object().test(
                "individual-answers",
                "",
                function (answers) {
                    if (!questions) return false;
                    const errors: Record<string, string> = {};
                    questions.forEach((q) => {
                        if (!answers || !answers[q.questionNumber] || answers[q.questionNumber].trim() === "") {
                            errors[q.questionNumber] = "Required";
                        }
                    });
                    if (Object.keys(errors).length > 0) {
                        throw this.createError({ path: "answers", value: answers, message: errors });
                    }
                    return true;
                }
            ),
        }),
        onSubmit: async (values) => {
            const payload: QuestionAnswerItemRequest[] = Object.entries(values.answers).map(([key, value]) => ({
                questionNumber: Number(key),
                answer: value,
            } as QuestionAnswerItemRequest));

            try {
                setLoading(true);
                await interactionService.completeExperiment(experimentId, payload);
                setLoading(false);
                setSubmitted(true);
            } catch (error) {
                console.error("Failed to complete experiment:", error);
            }
        },
        enableReinitialize: true,
        validateOnChange: false,
        validateOnBlur: false
    });

    if (loading) {
        return <LoadingContent loadingStrings={null}/>;
    }

    if (submitted) {
        return <ThankYouPage/>;
    }

    if (!questions || questions.length === 0) {
        return <div>No questions found.</div>;
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>Congratilustions! You are done. We have a few questions for you:</div>
            {questions.map((question, index) => {
                const fieldName = `answers.${question.questionNumber}`;
                const error = formik.errors.answers && typeof formik.errors.answers === 'object' ? formik.errors.answers[question.questionNumber] : undefined;

                return (
                    <div key={question.questionNumber} style={{ marginBottom: "20px" }}>
                        <h3>Question {index + 1}</h3>
                        <p>{question.text}</p>
                        {question.options && question.options.length > 0 ? (
                            <FormControl fullWidth error={Boolean(error)}>
                                <InputLabel>Select an option</InputLabel>
                                <Select
                                    label="Select an option"
                                    name={fieldName}
                                    value={formik.values.answers[question.questionNumber] || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    {question.options.map((option, idx) => (
                                        <MenuItem key={idx} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {error && <FormHelperText>{error}</FormHelperText>}
                            </FormControl>
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
        </form>
    );
}

export default FinalFormPage;
