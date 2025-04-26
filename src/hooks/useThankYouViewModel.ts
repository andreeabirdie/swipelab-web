import {Experiment} from "../models/Experiment.ts";
import {useEffect, useState} from "react";
import {ThankYouUiState} from "../types/ThankYouUiState.ts";
import {localStorageService} from "../services/localStorageService.ts";

export function useThankYouViewModel() {
    const [uiState, setUiState] = useState<ThankYouUiState>({status: 'loading'});

    useEffect(() => {
        // localStorageService.set("test", "test")
        localStorageService.remove("test")
        const getExperimentId = () => {
            const experiment = localStorageService.get<Experiment>('current_experiment');

            if (experiment == null) {
                console.error('Failed to parse experiment');
                setUiState({status: 'error'});
            } else {
                setUiState({status: 'content', experimentId: experiment.experimentId});
            }
        };

        getExperimentId();
    }, []);

    return uiState;
}