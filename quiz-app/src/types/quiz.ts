export type GameState = "start" | "playing" | "end";

export interface Question {
    question: string;
    options: string[];
    correct: number;
}

export interface Answers {
    question: string;
    options: string[];
    correctAnswer: number;
    userAnswer: number;
}