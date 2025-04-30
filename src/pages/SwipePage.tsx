import React, {useEffect, useState} from "react";
import {Experiment} from "../models/Experiment.ts";
import {SwipeUiState} from "../types/SwipeUiState.ts";
import interactionService from "../services/InteractionService.ts";
import LoadingContent from "../components/LoadingContent.tsx";
import strings from "../strings.json";
import {ErrorCard} from "../components/ErrorCard.tsx";
import SwipeCards from "../components/SwipeCards.tsx";
import {SwipeDirection} from "../models/enums/SwipeDirection.ts";

type SwipePageProps = {
    experiment: Experiment
}

const SwipePage: React.FC<SwipePageProps> = ({experiment}) => {
    const [uiState, setUiState] = useState<SwipeUiState>({status: 'loading'});

    const loadCards = () => {
        fetchProfiles(experiment.datingProfileSetId)
    };

    useEffect(() => {
        loadCards();
    }, []);

    const fetchProfiles = async (setId: string) => {
        try {
            const profiles = await interactionService.getDatingProfiles(setId);
            setUiState({status: "content", profiles: profiles});
        } catch (err) {
            console.error(err);
            setUiState({status: 'error'});
        }
    };

    const swipe = (direction: SwipeDirection, elapsedTime: number, datingProfileId: string) => {
        try {
            interactionService.swipeProfile(
                {
                    swipeState: direction,
                    timeSpentSeconds: elapsedTime,
                },
                datingProfileId
            );
        } catch (err) {
            console.error(err);
            setUiState({ status: 'error' });
        }
    }

    switch (uiState.status) {
        case "go_to_thank_you":
            break;
        case "go_to_final_form":
            break;
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
            const cards = uiState.profiles.slice(experiment.swipeCount).reverse()
            return <SwipeCards profiles={cards} onSwipe={swipe}/>
    }
};

export default SwipePage