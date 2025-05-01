import {Experiment} from "../models/Experiment";
import axios from 'axios';
import {DatingProfile} from "../models/DatingProfile";
import {ExperimentCreateRequest} from "../models/requests/ExperimentCreateRequest";
import {Question} from "../models/Question";
import {QuestionAnswerItemRequest} from "../models/requests/QuestionAnswerItemRequest";
import {SwipeRequest} from "../models/requests/SwipeRequest.ts";
import {FeedbackPromptResponse} from "../models/FeedbackPromptsResponse.ts";
import {ReflectRequest} from "../models/requests/ReflectRequest.ts";

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

    async getFinalQuestions(experimentId: string): Promise<Question[]> {
        const response = await axios.get<Question[]>(`${this.baseUrl}/experiment/${experimentId}/final-questions`);
        return response.data;
    }

    async completeExperiment(experimentId: string, data: QuestionAnswerItemRequest[]): Promise<Experiment> {
        const response = await axios.post<Experiment>(`${this.baseUrl}/experiment/${experimentId}/complete`, data);
        return response.data;
    }

    async swipeProfile(swipeRequest: SwipeRequest, datingProfileId: string): Promise<void> {
        const response = await axios.post(`${this.baseUrl}/profiles/${datingProfileId}/swipe`, swipeRequest)
        return response.data
    }

    async getReflectionPrompts(experimentId: string): Promise<FeedbackPromptResponse> {
        const response = await axios.get<FeedbackPromptResponse>(`${this.baseUrl}/feedback/prompts/${experimentId}`)
        return response.data;
    }

    async reflectOnProfile(reflectRequest: ReflectRequest, datingProfileId: string): Promise<void> {
        const response = await axios.post(`${this.baseUrl}/profiles/${datingProfileId}/reflect`, reflectRequest)
        return response.data
    }
}

const interactionService = new InteractionService('https://swipelab-api.victoriousbay-737ac648.northeurope.azurecontainerapps.io');
export default interactionService;