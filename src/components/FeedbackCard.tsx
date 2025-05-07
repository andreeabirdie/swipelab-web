import {Box, Card, CardContent} from "@mui/material";
import LoadingContent from "./LoadingContent.tsx";
import FeedbackForm from "./FeedbackForm.tsx";
import React from "react";
import useCardSize from "../hooks/useCardHeight.ts";
import {CardInfo} from "../models/CardInfo.ts";
import {FeedbackPromptResponse} from "../models/FeedbackPromptsResponse.ts";

type FeedbackCardProps = {
    card: CardInfo;
    feedbackPrompts: FeedbackPromptResponse | null;
    onSubmitFeedback: (changedOpinion: boolean, answers: Record<string, string>) => void;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({card, feedbackPrompts, onSubmitFeedback}) => {
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
                    profileId={card.profile.datingProfileId}
                    feedbackPrompts={feedbackPrompts}
                    onSubmitForm={onSubmitFeedback}
                />
            }
        </CardContent>
    </Card>
};

export default FeedbackCard;