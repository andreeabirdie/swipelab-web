import {DatingProfile} from "../models/DatingProfile.ts";
import TinderCard from "react-tinder-card";
import ProfileCard from "./ProfileCard.tsx";
import {Button, useTheme} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import React, {RefObject, useEffect, useMemo, useRef, useState} from "react";
import { SwipeDirection } from "../models/enums/SwipeDirection.ts";

type SwipeProps = {
    profiles: DatingProfile[],
    onSwipe: (direction: SwipeDirection, elapsedTime: number, datingProfileId: string) => void,
}

type Direction = 'left' | 'right' | 'up' | 'down';

const SwipeContent: React.FC<SwipeProps> = ({profiles, onSwipe}) => {
    const theme = useTheme();

    const [currentIndex, setCurrentIndex] = useState(profiles.length - 1)
    const [cardShownTime, setCardShownTime] = useState<number>(0);
    useEffect(() => {
        setCardShownTime(Date.now());
    }, [currentIndex]);

    const currentIndexRef = useRef(currentIndex)

    const childRefs: RefObject<any>[] = useMemo(
        () =>
            Array(profiles.length)
                .fill(0)
                .map(() => React.createRef()),
        []
    );

    const updateCurrentIndex = (val: number) => {
        setCurrentIndex(val);
        currentIndexRef.current = val;
    };

    const canSwipe = currentIndex >= 0;

    const swiped = (direction: Direction, nameToDelete: string, index: number) => {
        console.log("swipe", swipe, direction, nameToDelete);
        updateCurrentIndex(index - 1);
        const swipeDirection = direction === 'left' ? SwipeDirection.left : SwipeDirection.right;
        console.log(`called swiped callback on ${profiles[currentIndex].name}`)
        const elapsedTime = Math.floor((Date.now() - cardShownTime) / 1000);
        onSwipe(swipeDirection, elapsedTime, profiles[currentIndex].datingProfileId);
    };

    const outOfFrame = (name: string, idx: number) => {
        console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
        if (currentIndexRef.current >= idx) {
            childRefs[idx].current?.restoreCard();
        }
    };

    const swipe = async (dir: Direction) => {
        if (canSwipe && currentIndex < profiles.length) {
            const cardRef = childRefs[currentIndex]
            await cardRef.current?.swipe(dir);
            const direction = dir === 'left' ? SwipeDirection.left : SwipeDirection.right;
            console.log(`called swiped callback on ${profiles[currentIndex].name}`)
            const elapsedTime = Math.floor((Date.now() - cardShownTime) / 1000);
            onSwipe(direction, elapsedTime, profiles[currentIndex].datingProfileId);
            profiles
        }
    };

    return (
        <>
            <div className="card-container">
                {[...profiles].map((profile, index) => {
                    return (
                        <TinderCard
                            ref={childRefs[index]}
                            className="swipe"
                            key={profile.datingProfileId}
                            onSwipe={(dir) => swiped(dir as Direction, profile.name, index)}
                            onCardLeftScreen={() => outOfFrame(profile.name, index)}
                            preventSwipe={['up', 'down']}
                            swipeRequirementType={'position'}
                            flickOnSwipe={true}>
                            <ProfileCard profile={profile}/>
                        </TinderCard>
                    );
                })}
            </div>

            <div className="button-container">
                <Button
                    onClick={() => {
                        swipe("left")
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
                        swipe("right")
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
        </>
    );
};

export default SwipeContent;