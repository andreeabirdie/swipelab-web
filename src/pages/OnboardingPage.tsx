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
import {ExperimentState} from "../models/enums/ExperimentState";
import FinalFormPage from "./FinalFormPage";
import Logger from "../utils/logger.ts";
import {AxiosError} from "axios";

const OnboardingPage: React.FC = () => {
    const [uiState, setUiState] = useState<OnboardingUiState>({status: 'loading'});

    const getExperimentId = () => {
        const experiment = localStorageService.get<Experiment>('current_experiment');

        if (experiment == null) {
            setUiState({status: 'content'});
        } else {
            fetchExperiment(experiment.experimentId).then(_ => {});
        }
    };

    useEffect(() => {
        getExperimentId();
    }, []);

    const fetchExperiment = async (experimentId: string) => {
        try {
            const experiment = await interactionService.getExperiment(experimentId);
            localStorageService.set<Experiment>('current_experiment', experiment);
            Logger.info(`Successfully fetched experiment ${experiment.experimentId}`);
            switch (experiment.state){
                case ExperimentState.SWIPING:
                    Logger.info(`Experiment has started. Going to swiping.`);
                    setUiState({status: 'go_to_swiping', experiment: experiment});
                    break;
                case ExperimentState.FINAL_FORM:
                    Logger.info(`Swiping has finished. Going to final form.`);
                    setUiState({status: 'go_to_final_form', experiment})
                    break;
                case ExperimentState.COMPLETE:
                    Logger.info(`Experiment was already completed. Going to thank you page`);
                    setUiState({status: 'go_to_thank_you', experiment: experiment});
                    break;
            }
        } catch (err) {
            Logger.error(`Failed to fetch experiment ${experimentId}`, {experimentId: experimentId});
            if((err as AxiosError)?.message === 'Network Error') {
                Logger.error(`No internet`);
                setUiState({status: 'error'});
            } else {
                Logger.error(`Removing experiment ${experimentId} from cache.`, {experimentId: experimentId});
                localStorageService.remove('current_experiment');
                setUiState({status: 'content'});
            }
        }
    };

    const createExperiment= async (answers: OnboardingAnswers)=> {
        try {
            setUiState({status: 'loading'});
            const experiment = await interactionService.createExperiment(mapOnboardingAnswersToParticipant(answers));
            localStorageService.set<Experiment>('current_experiment', experiment);
            Logger.info(`Successfully created experiment ${experiment}`);
            setUiState({status: 'go_to_swiping', experiment: experiment})
        } catch (err) {
            Logger.error('Failed to create experiment');
            setUiState({status: 'error'});
        }
    }

    switch (uiState.status) {
        case "loading":
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
        case "error":
            return <ErrorCard/>;
        case "content":
            return <OnboardingForm onSubmit={createExperiment}/>;
        case "go_to_swiping":
            return <SwipePage experiment={uiState.experiment} />;
        case "go_to_final_form":
            return <FinalFormPage experimentId={uiState.experiment.experimentId} />
        case "go_to_thank_you":
            return <ThankYouPage experimentId={uiState.experiment.experimentId} />;
    }
}

export default OnboardingPage