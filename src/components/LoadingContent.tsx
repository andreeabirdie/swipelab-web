import React from "react";
import AnimatedTextSwitcher from "./AnimatedTextSwitcher.tsx";
import { FourSquare } from "react-loading-indicators";
import {useTheme} from "@mui/material";

type LoadingContentProps = {
    loadingStrings: string[] | null;
}

const LoadingContent: React.FC<LoadingContentProps> = ({ loadingStrings }) => {
    const theme = useTheme();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <FourSquare color={theme.palette.primary.main} size="medium" text="" textColor="" />
            {loadingStrings && (
                <AnimatedTextSwitcher messages={loadingStrings} />
            )}
        </div>
    );
};

export default LoadingContent;