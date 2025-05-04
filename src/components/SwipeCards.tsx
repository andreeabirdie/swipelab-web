import {Box, Button, LinearProgress, Typography, useTheme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from "react";
import {SwipeDirection} from "../models/enums/SwipeDirection.ts";
import SwipeableCard from "../components/SwipeableCard";
import {SwipeRequest} from "../models/requests/SwipeRequest.ts";
import {CardInfo} from "../models/CardInfo.ts";
import interactionService from "../services/InteractionService.ts";
import Logger from "../utils/logger.ts";
import {ReflectRequest} from "../models/requests/ReflectRequest.ts";
import {SwipeUiState} from "../types/SwipeUiState.ts";
import useScreenSize from "../hooks/useScreenSize.ts";
import useCardSize from "../hooks/useCardHeight.ts";
import strings from "../strings.json";

type SwipeProps = {
    experimentId: string
    cards: CardInfo[],
    onSwipe: (swipeRequest: SwipeRequest, datingProfileId: string) => void,
    swipeCount: number,
    numberOfCards: number,
    setSwipePageState: (state: SwipeUiState) => void
}

const SwipeCards: React.FC<SwipeProps> = ({
                                              experimentId,
                                              cards,
                                              onSwipe,
                                              swipeCount,
                                              numberOfCards,
                                              setSwipePageState
                                          }) => {
    const theme = useTheme();
    const screenSize = useScreenSize()
    const cardSize = useCardSize()

    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);
    const [cardShownTime, setCardShownTime] = useState<number>(0);
    const [feedbackPrompts, setFeedbackPrompts] = useState<string[] | null>(null);

    const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
    useEffect(() => {
        setCardShownTime(Date.now());
        if (cards[currentIndex].isFeedbackCard) {
            getReflection(experimentId).then(_ => {});
        }
    }, [currentIndex]);
    const [numberOfFlips, setNumberOfFlips] = useState(0);
    const [changedMind, setChangedMind] = useState(false)
    const [promptsAndAnswers, setPromptsAndAnswers] = useState({})

    const handleSwipe = (direction: 'left' | 'right' | 'up') => {
        setSwipeDirection(direction);
    };

    const handleSwipeEnd = () => {
        const elapsedTime = Math.floor((Date.now() - cardShownTime) / 1000);

        const currentCard = cards[currentIndex];
        if (currentIndex > 0) cards[currentIndex - 1].userLiked = swipeDirection === 'right';

        if (currentCard.isFeedbackCard) {
            reflect({
                    changedOpinion: changedMind,
                    profileReviewCount: Math.floor(numberOfFlips / 2),
                    timeSpentSeconds: elapsedTime,
                    promptAnswers: promptsAndAnswers
                },
                currentCard.profile.datingProfileId
            )
        } else {
            const direction = swipeDirection === "left" ? SwipeDirection.left : SwipeDirection.right
            onSwipe(
                {
                    swipeState: direction,
                    timeSpentSeconds: elapsedTime,
                },
                currentCard.profile.datingProfileId
            )
        }
        setFeedbackPrompts(null)
        setSwipeDirection(null);
        setNumberOfFlips(0);
        if (currentIndex == 0) {
            setSwipePageState({status: "go_to_final_form"})
        }

        setCurrentIndex((prev) => prev - 1);
    };

    const waitForKeyboardToHide = (): Promise<void> => {
        return new Promise((resolve) => {
            const initialHeight = window.innerHeight;

            const handleResize = () => {
                if (window.innerHeight > initialHeight) {
                    window.removeEventListener('resize', handleResize);
                    resolve();
                }
            };

            window.addEventListener('resize', handleResize);

            setTimeout(() => {
                window.removeEventListener('resize', handleResize);
                resolve();
            }, 300);
        });
    };

    const flipCard = async () => {
        await waitForKeyboardToHide()
        setNumberOfFlips((prev) => prev + 1)
    }

    const submitFeebackForm = (changedOpinion: boolean, answers: Record<string, string>) => {
        setChangedMind(changedOpinion);
        setPromptsAndAnswers(answers)
        handleSwipe("up")
    }

    const getReflection = async (experimentId: string) => {
        try {
            const response = await interactionService.getReflectionPrompts(experimentId);
            Logger.info(`Successfully retrieved reflection prompts for profile ${experimentId}`);
            setFeedbackPrompts(response.prompts)
        } catch (err) {
            Logger.error(`Failed to retrieved reflection prompts for profile ${experimentId}`, {datingProfileId: experimentId});
            setSwipePageState({status: 'error'});
        }
    }

    const reflect = (reflectRequest: ReflectRequest, datingProfileId: string) => {
        try {
            interactionService.reflectOnProfile(reflectRequest, datingProfileId).then(_ => {});
            Logger.info(`Successfully reflected on profile ${datingProfileId}`);
        } catch (err) {
            Logger.error(`Failed to reflect on profile ${datingProfileId}`, {datingProfileId: datingProfileId});
            setSwipePageState({status: 'error'});
        }
    }

    const percentage = (((cards.length - 1 - currentIndex + swipeCount) / numberOfCards) * 100);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: screenSize.height,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                boxSizing: 'border-box'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '10px',
                    marginBottom: '16px',
                    marginTop: '16px'
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{flexGrow: 1, height: 8, borderRadius: 4}}
                />
                <Typography
                    variant="body2"
                    sx={{marginLeft: 2, minWidth: 40}}
                >
                    {Math.min(100, Math.round(percentage))}%
                </Typography>
            </Box>

            <Box
                sx={{
                    width: cardSize.width,
                    height: cardSize.height,
                }}
                className='card-container'
            >
                {[...cards].map((card, index) => {
                    const shouldDisplay = index <= currentIndex && index > currentIndex - 2;

                    return (
                        <div
                            key={`${card.profile.datingProfileId}-${card.isFeedbackCard}`}
                            style={{
                                zIndex: index,
                                display: shouldDisplay ? 'block' : 'none'
                            }}
                        >
                            <SwipeableCard
                                index={index}
                                card={card}
                                swipeDirection={swipeDirection}
                                currentIndex={currentIndex}
                                onSwipeEnd={handleSwipeEnd}
                                feedbackPrompts={feedbackPrompts}
                                flipped={numberOfFlips % 2 === 1}
                                onSubmitFeedback={submitFeebackForm}
                            />
                        </div>
                    );
                })}
            </Box>

            {cards[currentIndex].isFeedbackCard ?
                <Box className="button-container" sx={{width: cardSize.width}}>
                    <Button
                        onClick={flipCard}
                        sx={{
                            textTransform: 'none',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.contrastText,
                            fontWeight: 'bold',
                        }}
                        disabled={feedbackPrompts == null}
                    >
                        {numberOfFlips % 2 === 0 ? strings.feedback_go_to_questions : strings.feedback_see_profile}
                    </Button>
                </Box> :
                <Box className="button-container" sx={{width: cardSize.width}}>
                    <Button
                        onClick={() => {
                            handleSwipe("left")
                        }}
                        sx={{
                            minWidth: 56,
                            minHeight: 56,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.contrastText
                        }}
                    >
                        <CloseIcon/>
                    </Button>

                    <Button
                        onClick={() => {
                            handleSwipe("right");
                        }}
                        sx={{
                            minWidth: 56,
                            minHeight: 56,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.contrastText
                        }}
                    >
                        <FavoriteIcon/>
                    </Button>
                </Box>
            }
        </Box>
    );
};

export default SwipeCards;