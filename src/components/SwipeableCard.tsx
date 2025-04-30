import {motion, useAnimation} from 'framer-motion';
import React, {useEffect} from 'react';
import ProfileCard from './ProfileCard';
import {DatingProfile} from '../models/DatingProfile';

type SwipeableCardProps = {
    index: number,
    currentIndex: number,
    profile: DatingProfile,
    swipeDirection: "left" | "right" | null,
    onSwipeEnd?: (datingProfileId: string) => void,
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({index, currentIndex, profile, swipeDirection, onSwipeEnd}) => {
    const controls = useAnimation();

    useEffect(() => {
        if (swipeDirection && index === currentIndex) {
            controls.start({
                x: swipeDirection === 'left' ? -1000 : 1000,
                rotate: swipeDirection === 'right' ? 45 : -45,
                opacity: 0,
                transition: {duration: 0.4},
            }).then(() => {
                onSwipeEnd?.(profile.datingProfileId);
            });
        }
    }, [swipeDirection]);

    return (
        <motion.div
            animate={controls}
            initial={{x: 0, opacity: 1}}
        >
            <ProfileCard profile={profile}/>
        </motion.div>
    );
};

export default SwipeableCard;
