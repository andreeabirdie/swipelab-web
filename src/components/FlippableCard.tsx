import {AnimatePresence, motion} from 'framer-motion';
import React, {Ref} from "react";
import ProfileCard from "./ProfileCard.tsx";
import {CardInfo} from "../models/CardInfo.ts";
import FeedbackCard from "./FeedbackCard.tsx";
import useCardSize from "../hooks/useCardHeight.ts";
import { Box } from '@mui/material';
import {FormikProps} from "formik";
import {FeedbackAnswers} from "../models/FeedbackAnswers.ts";

type FlippableCardProps = {
    card: CardInfo;
    flipped: boolean;
    feedbackPrompts: string[] | null;
    onSubmitFeedback: (changedOpinion: boolean, answers: Record<string, string>) => void;
    formRef: Ref<FormikProps<FeedbackAnswers>>;
}

const FlippableCard: React.FC<FlippableCardProps> = ({card, flipped, feedbackPrompts, onSubmitFeedback, formRef}) => {
    const cardSize = useCardSize();

    return <Box
        sx={{
            position: 'relative',
            width: cardSize.width,
            height: cardSize.height,
            overflow: 'hidden',
        }}
    >
        {/* FeedbackCard stays always rendered */}
        <FeedbackCard
            card={card}
            feedbackPrompts={feedbackPrompts}
            onSubmitFeedback={onSubmitFeedback}
            formRef={formRef}
        />

        <AnimatePresence>
            {flipped && (
                <motion.div
                    key="profile"
                    initial={{ y: '-100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.4 }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: cardSize.width,
                        height: cardSize.height,
                        zIndex: 10,
                    }}
                >
                    <ProfileCard profile={card.profile} />
                </motion.div>
            )}
        </AnimatePresence>
    </Box>
};

export default FlippableCard;
