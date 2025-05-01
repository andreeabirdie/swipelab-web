export interface ReflectRequest {
    changedOpinion: boolean,
    timeSpentSeconds: number,
    profileReviewCount: number,
    promptAnswers: Record<string, string>
}