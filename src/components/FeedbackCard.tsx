import {Box, Card, CardContent} from "@mui/material";
import LoadingContent from "./LoadingContent.tsx";
import FeedbackForm from "./FeedbackForm.tsx";
import React, {Ref} from "react";
import useCardSize from "../hooks/useCardHeight.ts";
import {CardInfo} from "../models/CardInfo.ts";
import {FormikProps} from "formik";
import {FeedbackAnswers} from "../models/FeedbackAnswers.ts";

type FeedbackCardProps = {
    card: CardInfo;
    feedbackPrompts: string[] | null;
    onSubmitFeedback: (changedOpinion: boolean, answers: Record<string, string>) => void;
    formRef: Ref<FormikProps<FeedbackAnswers>>;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({card, feedbackPrompts, onSubmitFeedback, formRef}) => {
    const cardSize = useCardSize();

    return <Card sx={{width: cardSize.width, height: cardSize.height, overflowY: 'auto',}}>
        <CardContent>
            {feedbackPrompts === null ?
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: cardSize.height,
                    justifyContent: 'center'
                }}>
                    <LoadingContent loadingStrings={null}/>
                </Box> :
                <FeedbackForm
                    feedbackPrompts={feedbackPrompts}
                    userLiked={card.userLiked}
                    onSubmitForm={onSubmitFeedback}
                    formRef={formRef}
                />
            }
        </CardContent>
    </Card>
};

export default FeedbackCard;