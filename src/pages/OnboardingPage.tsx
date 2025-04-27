import React, {useEffect, useState} from 'react';
import OnboardingForm from "../components/OnboardingForm.tsx";
import LoadingContent from "../components/LoadingContent.tsx";
import {ErrorCard} from "../components/ErrorCard.tsx";
import strings from "../strings.json";
import {OnboardingUiState} from '../types/OnboardingUiState.ts';
import {localStorageService} from "../services/localStorageService.ts";
import {Experiment} from "../models/Experiment.ts";
import interactionService from "../services/InteractionService.ts";
import ThankYouPage from "./ThankYouPage.tsx";
import {mapOnboardingAnswersToParticipant, OnboardingAnswers} from "../models/OnboardingAnswers.ts";
import SwipePage from "./SwipePage.tsx";

const OnboardingPage: React.FC = () => {
    const [uiState, setUiState] = useState<OnboardingUiState>({status: 'loading'});

    useEffect(() => {
        const getExperimentId = () => {
            const experiment = localStorageService.get<Experiment>('current_experiment');

            if (experiment == null) {
                setUiState({status: 'content'})
            } else {
                fetchExperiment(experiment.experimentId)
            }
        };

        getExperimentId();
    }, []);

    const fetchExperiment = async (experimentId: string) => {
        try {
            const experiment = await interactionService.getExperiment(experimentId);
            localStorageService.set<Experiment>('current_experiment', experiment);
            if (experiment.state == 2) {
                setUiState({status: 'go_to_thank_you', experiment: experiment});
            } else {
                setUiState({status: 'go_to_swiping', experiment: experiment});
            }
        } catch (err) {
            console.error(err);
            localStorageService.remove('current_experiment');
            setUiState({status: 'content'});
        }
    };

    const createExperiment= async (answers: OnboardingAnswers)=> {
        try {
            setUiState({status: 'loading'});
            const experiment = await interactionService.createExperiment(mapOnboardingAnswersToParticipant(answers));
            localStorageService.set<Experiment>('current_experiment', experiment);
            setUiState({status: 'go_to_swiping', experiment: experiment})
        } catch (err) {
            console.error(err);
            setUiState({status: 'error'});
        }
    }

    if (uiState.status === 'loading') {
        return <LoadingContent
            loadingStrings={[
                strings.initializing_profile,
                strings.defining_preferences,
                strings.setting_boundaries,
                strings.mapping_persona,
                strings.configuring_traits,
                strings.personalizing_experience,
                strings.establishing_identity
            ]}
        />;
    }
    if (uiState.status === 'error') return <ErrorCard/>;
    if (uiState.status === 'go_to_thank_you') return <ThankYouPage experiment={uiState.experiment} />
    if (uiState.status === 'go_to_swiping') return <SwipePage experiment={uiState.experiment} />

    return <OnboardingForm onSubmit={createExperiment}/>
}

export default OnboardingPage