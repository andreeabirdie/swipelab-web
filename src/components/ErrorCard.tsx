import React from 'react';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

type ErrorCardProps = {
    title?: string;
    subtitle?: string;
    errorMessage?: string | null;
    className?: string;
};

export const ErrorCard: React.FC<ErrorCardProps> =
    ({
         title = 'Something went wrong',
         subtitle = 'Please try again later.',
         errorMessage,
         className = '',
     }) => {
        return (
            <div
                className={`w-full max-w-xl mx-auto border border-primary rounded-2xl p-4 bg-transparent shadow-sm ${className}`}
            >
                <div className="flex items-start gap-4">
                    <ErrorOutline className="error_icon"/>

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
