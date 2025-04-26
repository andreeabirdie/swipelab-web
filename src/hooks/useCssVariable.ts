import { useEffect, useState } from 'react';

export function useCssVariable(variableName: string, fallback: string) {
    const [value, setValue] = useState(fallback);

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const varValue = rootStyles.getPropertyValue(variableName).trim();
        if (varValue) {
            setValue(varValue);
        }
    }, [variableName]);

    return value;
}