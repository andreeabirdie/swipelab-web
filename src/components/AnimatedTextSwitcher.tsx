import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import React from 'react';

interface AnimatedTextSwitcherProps {
    messages: string[];
}

const AnimatedTextSwitcher : React.FC<AnimatedTextSwitcherProps>  = ({messages})=>  {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let showTimeout: ReturnType<typeof setTimeout>;
        let hideTimeout: ReturnType<typeof setTimeout>;

        const cycleMessage = () => {
            setVisible(true);
            showTimeout = setTimeout(() => {
                setVisible(false);
                hideTimeout = setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
                }, 500);
            }, 2000);
        };

        cycleMessage();

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(hideTimeout);
        };
    }, [currentIndex, messages.length]);

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <AnimatePresence mode="wait">
                {visible && (
                    <motion.div
                        key={currentIndex}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5}}
                        style={{textAlign: 'center', color: 'var(--color-primary)', fontSize: '1.25rem'}}
                    >
                        {messages[currentIndex]}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default AnimatedTextSwitcher;