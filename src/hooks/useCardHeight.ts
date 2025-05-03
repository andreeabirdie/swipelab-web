import { useState, useEffect } from 'react';

const useCardSize = () => {
    const [cardSize, setCardSize] = useState({
        width: Math.min(window.innerWidth - 48, 350),
        height: Math.min(window.innerHeight - 140, 700),
    });

    useEffect(() => {
        const handleResize = () => {
            setCardSize({
                width: Math.min(window.innerWidth - 48, 350),
                height: Math.min(window.innerHeight - 180, 700),
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return cardSize;
};

export default useCardSize;