// src/pages/CreateExperimentPage.tsx

import React, { useState } from 'react';
import interactionService from '../services/InteractionService';
import {ExperimentCreateRequest} from "../models/requests/ExperimentCreateRequest";
import {UsageOfDatingApps} from "../models/enums/UsageOfDatingApps";
import {Experiment} from "../models/Experiment";
import {Gender} from "../models/enums/Gender";
import {DatingApps} from "../models/enums/DatingApps";
import {RelationshipStatus} from "../models/enums/RelationshipStatus";
import TestExperimentPage from "./TestExperimentPage";

const CreateExperimentPage: React.FC = () => {
    const [formData, setFormData] = useState<ExperimentCreateRequest>({
        dateOfBirth: '',
        gender: Gender.Male,
        interestedIn: Gender.Female,
        minAge: 18,
        maxAge: 30,
        height: 170,
        ethnicity: '',
        countryOfResidency: '',
        usageOfDatingApps: UsageOfDatingApps.YesCurrentlyInUse,
        knownDatingApps: [],
        relationshipStatus: RelationshipStatus.IN_A_RELATIONSHIP,
    });

    const [error, setError] = useState<string | null>(null);
    const [createdExperiment, setCreatedExperiment] = useState<Experiment | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = e.target.options;
        const selected: DatingApps[] = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value as unknown as DatingApps);
            }
        }
        setFormData(prev => ({
            ...prev,
            knownDatingApps: selected,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const experiment = await interactionService.createExperiment(formData);
            setCreatedExperiment(experiment); // set the experiment -> will trigger rendering ExperimentPage
        } catch (err) {
            console.error(err);
            setError('Failed to create experiment. Please try again.');
        }
    };

    if (createdExperiment) {
        return <TestExperimentPage experiment={createdExperiment} />;
    }

    return (
        <div>
            <h1>Create Experiment</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                <select name="gender" value={formData.gender} onChange={handleChange}>
                    {Object.values(Gender).filter(v => typeof v === 'number').map(v => (
                        <option key={v} value={v}>{Gender[v as number]}</option>
                    ))}
                </select>

                <select name="interestedIn" value={formData.interestedIn} onChange={handleChange}>
                    {Object.values(Gender).filter(v => typeof v === 'number').map(v => (
                        <option key={v} value={v}>{Gender[v as number]}</option>
                    ))}
                </select>

                <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} required />
                <input type="number" name="maxAge" value={formData.maxAge} onChange={handleChange} required />
                <input type="number" name="height" value={formData.height} onChange={handleChange} required />

                <input type="text" name="ethnicity" value={formData.ethnicity} onChange={handleChange} required />
                <input type="text" name="countryOfResidency" value={formData.countryOfResidency} onChange={handleChange} required />

                <select name="usageOfDatingApps" value={formData.usageOfDatingApps} onChange={handleChange}>
                    {Object.values(UsageOfDatingApps).filter(v => typeof v === 'number').map(v => (
                        <option key={v} value={v}>{UsageOfDatingApps[v as number]}</option>
                    ))}
                </select>

                <select multiple name="knownDatingApps" onChange={handleArrayChange}>
                    {Object.values(DatingApps).filter(v => typeof v === 'number').map(v => (
                        <option key={v} value={v}>{DatingApps[v as number]}</option>
                    ))}
                </select>

                <select name="relationshipStatus" value={formData.relationshipStatus} onChange={handleChange}>
                    {Object.values(RelationshipStatus).filter(v => typeof v === 'number').map(v => (
                        <option key={v} value={v}>{RelationshipStatus[v as number]}</option>
                    ))}
                </select>

                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateExperimentPage;
