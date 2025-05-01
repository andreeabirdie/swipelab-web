import {motion, useAnimation} from 'framer-motion';
import React, {useEffect} from 'react';
import ProfileCard from './ProfileCard';
import {CardInfo} from "../models/CardInfo.ts";
import FlippableCard from "./FlippableCard.tsx";

type SwipeableCardProps = {
    index: number,
    currentIndex: number,
    card: CardInfo,
    swipeDirection: "left" | "right" | "up" | null,
    onSwipeEnd?: () => void,
    feedbackPrompts: string[] | null
    flipped: boolean
    onSubmitFeedback: (changedOpinion: boolean, answers: Record<string, string>) => void
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({index, currentIndex, card, swipeDirection, onSwipeEnd, feedbackPrompts, flipped, onSubmitFeedback}) => {
    const controls = useAnimation();

    useEffect(() => {
        if (swipeDirection && index === currentIndex) {
            let animation;

            if (swipeDirection === 'up') {
                animation = {
                    y: -1000,
                    opacity: 0,
                    transition: { duration: 0.4 },
                };
            } else {
                animation = {
                    x: swipeDirection === 'left' ? -1000 : 1000,
                    rotate: swipeDirection === 'right' ? 45 : -45,
                    opacity: 0,
                    transition: { duration: 0.4 },
                };
            }

            controls.start(animation).then(() => {
                onSwipeEnd?.();
            });
        }
    }, [swipeDirection]);

    return (
        <motion.div
            animate={controls}
            initial={{x: 0, opacity: 1}}
        >
            {card.isFeedbackCard ? (
                <FlippableCard
                    card={card}
                    flipped={flipped}
                    feedbackPrompts={feedbackPrompts}
                    onSubmitFeedback={onSubmitFeedback}
                />
            ) : (
                <ProfileCard profile={card.profile} />
            )}
        </motion.div>
    );
};

export default SwipeableCard;
