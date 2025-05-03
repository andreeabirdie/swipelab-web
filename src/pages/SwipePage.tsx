import React, {useEffect, useState} from "react";
import {Experiment} from "../models/Experiment.ts";
import {SwipeUiState} from "../types/SwipeUiState.ts";
import interactionService from "../services/InteractionService.ts";
import LoadingContent from "../components/LoadingContent.tsx";
import strings from "../strings.json";
import {ErrorCard} from "../components/ErrorCard.tsx";
import Logger from "../utils/logger.ts";
import {SwipeRequest} from "../models/requests/SwipeRequest.ts";
import {CardInfo} from "../models/CardInfo.ts";
import {DatingProfile} from "../models/DatingProfile.ts";
import SwipeCards from "../components/SwipeCards.tsx";
import FinalFormPage from "./FinalFormPage.tsx";

type SwipePageProps = {
    experiment: Experiment
}

const SwipePage: React.FC<SwipePageProps> = ({experiment}) => {
    const [uiState, setUiState] = useState<SwipeUiState>({status: 'loading'});

    const loadCards = () => {
        fetchProfiles(experiment.datingProfileSetId).then(_ => {});
    };

    useEffect(() => {
        loadCards();
    }, []);

    const fetchProfiles = async (setId: string) => {
        try {
            const profiles = await interactionService.getDatingProfiles(setId);
            Logger.info(`Successfully retrieved ${profiles.length} profiles`);
            setUiState({status: "content", profiles: profiles});
        } catch (err) {
            Logger.error(`Failed to fetch profiles for experiment ${experiment.experimentId}`, {experimentId: experiment.experimentId});
            setUiState({status: 'error'});
        }
    };

    const swipe = (swipeRequest: SwipeRequest, datingProfileId: string) => {
        try {
            interactionService.swipeProfile(swipeRequest, datingProfileId);
            Logger.info(`Successfully swiped on profile ${datingProfileId}`);
        } catch (err) {
            Logger.error(`Failed to swipe on profile ${datingProfileId}`, {datingProfileId: datingProfileId});
            setUiState({status: 'error'});
        }
    }

    switch (uiState.status) {
        case "go_to_final_form":
            return <FinalFormPage experimentId={experiment.experimentId} />;
        case "loading":
            return <LoadingContent
                loadingStrings={[
                    strings.scanning_pool,
                    strings.filtering_profiles,
                    strings.calculating_overlap,
                    strings.matching_preferences,
                    strings.estimating_compatibility,
                    strings.refining_matches,
                    strings.loading_connections
                ]}
            />;
        case "error":
            return <ErrorCard/>;
        case "content":
            const withIndex = uiState.profiles.map((value, index) => ({ index, value }));
            const halfSize = Math.floor(uiState.profiles.length / 2);

            const firstHalf = withIndex.filter(item => item.index < halfSize);
            const secondHalf = withIndex.filter(item => item.index >= halfSize);

            const cardsToSkip = experiment.swipeCount + experiment.reflectionCount;
            const cards: CardInfo[] = [
                ...firstHalf.map(item => createCardInfo(item.value, false)),
                ...secondHalf.flatMap(item => [
                    createCardInfo(item.value, false),
                    createCardInfo(item.value, true),
                ])
            ]
                .slice(cardsToSkip)
                .reverse();

            return <SwipeCards
                experimentId={experiment.experimentId}
                cards={[cards[0], cards[1]]}
                onSwipe={swipe}
                swipeCount={cardsToSkip}
                numberOfCards={1.5 * uiState.profiles.length}
                setSwipePageState={setUiState}
            />
    }
};

function createCardInfo(profile: DatingProfile, isFeedback: boolean): CardInfo {
    return {
        profile: profile,
        isFeedbackCard: isFeedback,
        userLiked: null
    };
}

export default SwipePage