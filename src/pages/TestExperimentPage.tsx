import React, { useEffect, useState } from 'react';
import interactionService from '../services/InteractionService';
import {Experiment} from "../models/Experiment";


interface ExperimentPageProps {
    experiment: Experiment;
}

const TestExperimentPage: React.FC<ExperimentPageProps> = ({ experiment }) => {
    // const [experiment, setExperiment] = useState<Experiment | null>(null);
    // const [loading, setLoading] = useState(true);
    //
    // useEffect(() => {
    //     const fetchExperiment = async () => {
    //         try {
    //             const experimentData = await interactionService.getExperiment('461062b3-5134-437e-bb4f-314702b392a9');
    //             setExperiment(experimentData);
    //         } catch (error) {
    //             console.error('Failed to fetch experiment:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchExperiment();
    // }, []);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (!experiment) {
    //     return <div>No experiment data found.</div>;
    // }

    return (
        <div>
            <h1>Experiment Details</h1>
            <pre>{JSON.stringify(experiment, null, 2)}</pre>
        </div>
    );
};

export default TestExperimentPage;
