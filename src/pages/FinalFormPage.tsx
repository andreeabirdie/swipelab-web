import React, {useState} from "react";
import {questions} from "../models/Question";
import interactionService from "../services/InteractionService";
import {Form, Formik} from "formik";
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
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const initialValues: Record<number, string> = questions.reduce((acc, q) => {
        acc[q.questionNumber] = "";
        return acc;
    }, {} as Record<number, string>);

    const validationSchema = Yup.object(
        questions.reduce((acc, q) => {
            acc[q.questionNumber] = Yup.string()
                .required("This field is required")
                .test(
                    "not-blank",
                    "This field cannot be only whitespace",
                    value => value.trim().length > 0
                );
            return acc;
        }, {} as Record<number, Yup.StringSchema>));

    const handleSubmit = async (values : Record<number, string>) => {
        const payload: QuestionAnswerItemRequest[] = Object.entries(values).map(([key, value]) => ({
            questionNumber: Number(key),
            text: questions.find(q => q.questionNumber == Number(key))?.text,
            answer: value,
        } as QuestionAnswerItemRequest));

        try {
            setLoading(true);
            await interactionService.completeExperiment(experimentId, payload);
            Logger.info(`User finalized the final form for experiment ${experimentId}`, {experimentId: experimentId});
            setLoading(false);
            setSubmitted(true);
        } catch (error) {
            Logger.error(`Failed to save final form answers for experiment ${experimentId}`, {experimentId: experimentId});
            setIsError(true);
        }
    }

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
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
        >
            {({values, handleChange, errors, touched}) => (

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
                        <div>{strings.final_form_title}</div>
                        {questions.map((question, index) => {
                            return (
                                <div key={question.questionNumber} style={{marginBottom: "10px", width: "100%"}}>
                                    <h3>Question {index + 1}</h3>
                                    <p>{question.text}</p>
                                    {question.options && question.options.length > 0 ? (
                                        <SelectField
                                            name={`${question.questionNumber}`}
                                            label={strings.onboarding_choose_an_option}
                                            value={values[question.questionNumber]}
                                            handleChange={handleChange}
                                            errors={errors[question.questionNumber]}
                                            touched={touched[question.questionNumber]}
                                            options={question.options}
                                        />
                                    ) : (
                                        <TextField
                                            fullWidth
                                            name={`${question.questionNumber}`}
                                            label="Your answer"
                                            value={values[question.questionNumber] || ""}
                                            onChange={handleChange}
                                            error={Boolean(errors[question.questionNumber] && touched[question.questionNumber])}
                                            helperText={errors[question.questionNumber] && touched[question.questionNumber] ? errors[question.questionNumber] : ''}
                                        />
                                    )}
                                </div>
                            );
                        })}

                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

export default FinalFormPage;
