import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { Answers } from '../types/quiz';
import { CheckCircle, XCircle } from "lucide-react";


interface GameOverProps {
    answers: Answers[];
    onRestart: () => void;
}

export default function GameOver({ answers, onRestart }: GameOverProps) {
    const score = answers.filter(
        (answer) => answer.correctAnswer === answer.userAnswer
    ).length;
    return (
        <div className="mt-10">
            <h1 data-testid="game-over-title" className="text-center text-4xl font-bold text-black mb-6">Mäng läbi!</h1>
            <p data-testid="score" className="text-center text-gray-600 mb-8">
                Tulemus: {score} / {answers.length}
            </p>
            <TableContainer data-testid="results-table" className="mx-auto mt-10 w-full max-w-5xl border rounded-2xl overflow-hidden bg-gray-50">
                <Table className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell>Küsimus</TableCell>
                            <TableCell align='right'>Õige vastus</TableCell>
                            <TableCell align='right'>Sinu vastus</TableCell>
                            <TableCell align='right'>Tulemus</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {answers.map((answer, index) => {
                            const isCorrect = answer.correctAnswer === answer.userAnswer;

                            return (
                                <TableRow key={index}>
                                    <TableCell>{answer.question}</TableCell>
                                    <TableCell align='right'>
                                        {answer.options[answer.correctAnswer]}
                                    </TableCell>
                                    <TableCell align='right'>{answer.options[answer.userAnswer]}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            {isCorrect ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                            <XCircle className="w-5 h-5 text-red-500" />
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="flex justify-center mt-6">
                <button onClick={onRestart} className="inline-flex items-center bg-black hover:bg-gray-50 hover:text-black hover:border-2 hover:py-1.5 hover:px-3.5 text-gray-50 font-bold py-2 px-4">
                    Mängi uuesti
                </button>
            </div>
        </div>
    );
}