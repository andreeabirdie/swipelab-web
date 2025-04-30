import {SwipeDirection} from "../enums/SwipeDirection.ts";

export interface SwipeRequest{
    swipeState: SwipeDirection;
    timeSpentSeconds: number;
}