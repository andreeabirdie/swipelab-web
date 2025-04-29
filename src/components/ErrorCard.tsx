import React from 'react';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import {useTheme} from "@mui/material";

type ErrorCardProps = {
    title?: string;
    subtitle?: string;
    errorMessage?: string | null;
};

export const ErrorCard: React.FC<ErrorCardProps> =
    ({
         title = 'Something went wrong',
         subtitle = 'Please try again later.',
         errorMessage,
     }) => {
        const theme = useTheme();
        const errorColor = theme.palette.error.main;
        return (
            <div
                className="w-full max-w-xl mx-auto border border-primary rounded-2xl
                 p-4 bg-transparent shadow-sm align-center"
            >
                <div className="flex items-center justify-center gap-4">
                    <ErrorOutline sx={{color: errorColor}}/>

                    <div className="space-y-1">
                        <h3 className="text-primary text-lg font-semibold">{title}</h3>
                        <p className="text-primary text-sm">{subtitle}</p>
                        {errorMessage && (
                            <p className="text-primary text-xs opacity-80">{errorMessage}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };
