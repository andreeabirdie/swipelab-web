// import {motion} from 'framer-motion';
import React from "react";
// import ProfileCard from "./ProfileCard.tsx";
import {CardInfo} from "../models/CardInfo.ts";
import {Box, Card, CardContent} from "@mui/material";
import LoadingContent from "./LoadingContent.tsx";
import FeedbackForm from "./FeedbackForm.tsx";

interface FlippableCardProps {
    card: CardInfo;
    flipped: boolean;
    feedbackPrompts: string[] | null;
    onSubmitFeedback: (changedOpinion: boolean, answers: Record<string, string>) => void;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ card, flipped, feedbackPrompts, onSubmitFeedback }) => {
    return (
        // <motion.div
        //     style={{
        //         perspective: 1000,
        //         minWidth: '350px',
        //         minHeight: '700px'
        //     }}
        // >
        //     <motion.div
        //         animate={{ rotateY: flipped ? 180 : 0 }}
        //         transition={{ duration: 0.6 }}
        //         style={{
        //             width: '100%',
        //             height: '100%',
        //             transformStyle: 'preserve-3d',
        //             position: 'relative'
        //         }}
        //     >
        //         <motion.div
        //             style={{
        //                 backfaceVisibility: 'hidden',
        //                 width: '100%',
        //                 height: '100%',
        //                 position: 'absolute',
        //             }}
        //         >
                    <Card sx={{width: 350, height: 'min(700px, calc(100vh - 140px))', overflowY: 'auto'}}>
                        <CardContent>
                            {feedbackPrompts === null ?
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 'min(700px, calc(100vh - 140px))',
                                    justifyContent: 'center'
                                }}>
                                    <LoadingContent loadingStrings={null}/>
                                </Box> :
                                <FeedbackForm
                                    feedbackPrompts={feedbackPrompts}
                                    userLiked={card.userLiked}
                                    onSubmitForm={onSubmitFeedback}
                                />
                            }
                        </CardContent>
                    </Card>
                // </motion.div>
                //
                // <motion.div
                //     style={{
                //         backfaceVisibility: 'hidden',
                //         transform: 'rotateY(180deg)',
                //         position: 'absolute',
                //         width: '100%',
                //         height: '100%',
                //     }}
                // >
                //     <ProfileCard profile={card.profile} />
                // </motion.div>
        //     </motion.div>
        // </motion.div>
    );
};

export default FlippableCard;
