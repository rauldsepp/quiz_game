import { CheckCircle, XCircle } from "lucide-react";
import type { Question } from "../types/quiz";

interface QuestionCardProps {
    question: Question;
    selectedAnswer: number | null;
    onAnswerSelect: (index: number) => void;
    totalQuestions: number;
    currentQuestion: number;
}
export default function QuestionCard({ 
    question, 
    selectedAnswer, 
    onAnswerSelect,
    totalQuestions,
    currentQuestion
}: QuestionCardProps) {

    const getButtonClass = (index: number): string => {
        if (selectedAnswer === null) {
            return "hover:bg-gray-100";
        }
        if (index === question.correct) {
            return "bg-green-100 border-green-500";
        }
        if (selectedAnswer === index) {
            return "bg-red-100 border-red-500";
        }
        return "opacity-50";
    }
    return <div>
        <h2 data-testid="question-counter" className="text-xl font-semibold text-black mb-2">
            Küsimus {currentQuestion + 1} / {totalQuestions}
        </h2>
        <p data-testid="question-text" className="text-gray-600 mb-4">{question.question}</p>
        <div className="space-y-3">
            {question.options.map((option, index) => (
                <button
                    key={index}
                    data-testid={`answer-${index}`}
                    onClick={() => selectedAnswer === null && onAnswerSelect(index)}
                    className={`w-full p-4 text-left border rounded-lg transition-all duration-300 
                        ${getButtonClass(index)}`}
                >
                    <div className="flex items-center justify-between ">
                        <span>{option}</span>
                        {selectedAnswer !== null && index === question.correct && (
                            <CheckCircle data-testid={`correct-icon-${index}`} className="w-5 h-5 text-green-500" />
                        )}
                        {selectedAnswer !== null && index === selectedAnswer && index !== question.correct && ( 
                            <XCircle data-testid={`wrong-icon-${index}`} className="w-5 h-5 text-red-500" /> 
                        )}
                    </div>
                </button>
            ))}
        </div>
    </div>
}