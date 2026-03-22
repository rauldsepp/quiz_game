import { useState } from "react"
import GameOver from "./components/game-over"
import QuestionCard from "./components/question-card"
import StartScreen from "./components/start-screen"
import type { Answers, GameState } from "./types/quiz"
import { QUESTIONS } from "./data/questions"
import Header from "./components/header"

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers[]>([]);

  const handleStart = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  const handleRestart = () => {
    setGameState("start");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  const handleAnswer = (index: number): void => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    const current = QUESTIONS[currentQuestion];

    const newAnswer: Answers = {
      question: current.question,
      options: current.options,
      correctAnswer: current.correct,
      userAnswer: index,
    };

    setAnswers((prev) => [...prev, newAnswer]);

    setTimeout(() => {
      const isLastQuestion = currentQuestion === QUESTIONS.length - 1;

      if (isLastQuestion) {
        setGameState("end");
      } else {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header></Header>
      <div className="max-w-2xl w-full mx-auto">
        {gameState === "start" && <StartScreen onStart={handleStart} />}
        {gameState === "playing" && (
          <div className="p-8">
            <QuestionCard 
              question={QUESTIONS[currentQuestion]}
              onAnswerSelect={handleAnswer}
              selectedAnswer={selectedAnswer}
              totalQuestions={QUESTIONS.length}
              currentQuestion={currentQuestion}
            />
          </div>
        )}
        {gameState === "end" && <GameOver answers={answers} onRestart={handleRestart} />}
      </div>

    </div>
  )
}

export default App
