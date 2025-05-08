export interface Question{
    questionNumber: number;
    text: string;
    options?: string[];
}

export const questions: Question[] = [
    {
        questionNumber: 1,
        text: "Did you learn anything from answering questions while swiping?",
    },
    {
        questionNumber: 2,
        text: "Did answering the questions change any of your swipe decisions?",
        options: ["Yes", "No", "Don't remember"],
    },
    {
        questionNumber: 3,
        text: "What did you think about being asked questions while swiping?",
    },
    {
        questionNumber: 4,
        text: "What did you think about the specific questions that were asked?",
    },
    {
        questionNumber: 5,
        text: "Has participating in this study changed your perspective or attitude towards dating apps? Please justify your answer.",
    },
    {
        questionNumber: 6,
        text: "On a scale of 1-7, how CONFIDENT were you in your swiping decisions after answering the questions?",
        options: [
            "1 - Not confident at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely confident",
        ],
    },
    {
        questionNumber: 7,
        text: "On a scale of 1-7, how COMFORTABLE did you feel rejecting profiles after answering the questions?",
        options: [
            "1 - Not comfortable at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely comfortable",
        ],
    },
    {
        questionNumber: 8,
        text: "On a scale of 1-7, how much did having to answer questions affect your enjoyment of using the app?",
        options: [
            "1 - Ruined it completely",
            "2",
            "3",
            "4 - No effect",
            "5",
            "6",
            "7 - Made it much more enjoyable",
        ],
    },
    {
        questionNumber: 9,
        text: "On a scale of 1-7, how likely are you to use a dating app that would ask you similar questions after EVERY profile?",
        options: [
            "1 - Extremely unlikely",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely likely",
        ],
    },
    {
        questionNumber: 10,
        text: "On a scale of 1-7, how likely are you to use a dating app that would ask you similar questions ONCE IN A WHILE?",
        options: [
            "1 - Extremely unlikely",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely likely",
        ],
    },
    {
        questionNumber: 11,
        text: "On a scale of 1-7, how trustworthy do you find the recommendations the dating apps make based on JUST YOUR SWIPES?",
        options: [
            "1 - Not trustworthy at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely trustworthy",
        ],
    },
    {
        questionNumber: 12,
        text: "On a scale of 1-7, how trustworthy would you find the recommendations the dating apps would make based on YOUR SWIPES AND WRITTEN JUSTIFICATIONS?",
        options: [
            "1 - Not trustworthy at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely trustworthy",
        ],
    },
    {
        questionNumber: 13,
        text: "On a scale of 1-7, how much did the questions make you feel like you were REFLECTING on your choices?",
        options: [
            "1 - Not at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Very much",
        ],
    },
    {
        questionNumber: 14,
        text: "On a scale of 1-7, how much did the questions make you feel like you had to DEFEND your choices?",
        options: [
            "1 - Not at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Very strongly",
        ],
    },
    {
        questionNumber: 15,
        text: "On a scale of 1-7, how personalized did you find the questions?",
        options: [
            "1 - Not personalized at all",
            "2",
            "3",
            "4 - Neutral",
            "5",
            "6",
            "7 - Extremely personalized",
        ],
    },
    {
        questionNumber: 16,
        text: "Did responding to the questions reveal differences between your stated preferences and actual swiping behavior?",
        options: ["Yes", "No", "Unsure"],
    },
    {
        questionNumber: 17,
        text: "Do you believe the questions helped you identify biases you were not previously aware of?",
        options: ["Yes", "No", "Unsure"],
    },
];