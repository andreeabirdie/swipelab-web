import {Experiment} from "../models/Experiment";
import axios from 'axios';
import {DatingProfile} from "../models/DatingProfile";
import {ExperimentCreateRequest} from "../models/requests/ExperimentCreateRequest";

class InteractionService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getExperiment(experimentId: string): Promise<Experiment> {
        const response = await axios.get<Experiment>(`${this.baseUrl}/experiment/${experimentId}`);
        return response.data;
    }

    async getDatingProfiles(setId: string): Promise<DatingProfile[]> {
        const response = await axios.get<DatingProfile[]>(`${this.baseUrl}/profiles/set/${setId}`);
        return response.data;
    }

    async createExperiment(data: ExperimentCreateRequest): Promise<Experiment> {
        const response = await axios.post<Experiment>(`${this.baseUrl}/experiment/new`, data);
        return response.data;
    }
}

const interactionService = new InteractionService('https://swipelab-api.victoriousbay-737ac648.northeurope.azurecontainerapps.io');
export default interactionService;