import React from "react";
import {useCssVariable} from "../hooks/useCssVariable.ts";
import AnimatedTextSwitcher from "./AnimatedTextSwitcher.tsx";
import { FourSquare } from "react-loading-indicators";

type LoadingContentProps = {
    loadingStrings: string[] | null;
}

const LoadingContent: React.FC<LoadingContentProps> = ({ loadingStrings }) => {
    const primaryColor = useCssVariable('--color-primary', '#AD9BF6');

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <FourSquare color={primaryColor} size="medium" text="" textColor="" />
            {loadingStrings && (
                <AnimatedTextSwitcher messages={loadingStrings} />
            )}
        </div>
    );
};

export default LoadingContent;