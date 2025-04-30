import {DatingProfile} from "../models/DatingProfile.ts";
import {Box, Button, LinearProgress, Typography, useTheme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import React, {useEffect, useState} from "react";
import {SwipeDirection} from "../models/enums/SwipeDirection.ts";
import SwipeableCard from "../components/SwipeableCard";

type SwipeProps = {
    profiles: DatingProfile[],
    onSwipe: (direction: SwipeDirection, elapsedTime: number, datingProfileId: string) => void,
    swipeCount: number,
    numberOfCards: number,
}

const SwipeCards: React.FC<SwipeProps> = ({profiles, onSwipe, swipeCount, numberOfCards}) => {
    const theme = useTheme();

    const [currentIndex, setCurrentIndex] = useState(profiles.length - 1);
    const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
    const [cardShownTime, setCardShownTime] = useState<number>(0);
    useEffect(() => {
        setCardShownTime(Date.now());
    }, [currentIndex]);

    const handleSwipe = (direction: 'left' | 'right') => {
        setSwipeDirection(direction);
    };

    const handleSwipeEnd = (datingProfileId: string) => {
        const elapsedTime = Math.floor((Date.now() - cardShownTime) / 1000);
        const direction = swipeDirection === "left" ? SwipeDirection.left : SwipeDirection.right
        onSwipe(direction, elapsedTime, datingProfileId)
        setSwipeDirection(null);
        setCurrentIndex((prev) => prev - 1);
    };
    const percentage = (((profiles.length - 1 - currentIndex + swipeCount) / numberOfCards) * 100);

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '8px 16px',
                    marginBottom: '8px',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={percentage}
                    sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                />
                <Typography
                    variant="body2"
                    sx={{ marginLeft: 2, minWidth: 40 }}
                >
                    {Math.min(100, Math.round(percentage))}%
                </Typography>
            </Box>


            <div className="card-container">
                {[...profiles].map((profile, index) => (
                    <div
                        key={profile.datingProfileId}
                        style={{
                            zIndex: index,
                            display: index > currentIndex ? 'none' : 'block'
                        }}
                    >
                        <SwipeableCard
                            index={index}
                            profile={profile}
                            swipeDirection={swipeDirection}
                            currentIndex={currentIndex}
                            onSwipeEnd={handleSwipeEnd}
                        />
                    </div>
                ))}
            </div>

            <div className="button-container">
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
                        handleSwipe("right")
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
            </div>
        </div>
    );
};

export default SwipeCards;