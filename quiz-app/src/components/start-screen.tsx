import { Play } from "lucide-react";

interface StartScreenProps {
    onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
    return (
        <div className="text-center p-8">
            <h1 className="text-4xl font-bold text-black mb-6">
                Eesti viktoriin
            </h1>
            <p className="text-gray-600 mb-8"> Pane oma teadmised proovile!</p>
            <button
                data-testid="start-button"
                onClick={onStart} 
                className="inline-flex items-center bg-black hover:bg-gray-50 hover:text-black hover:border-2 hover:py-1.5 hover:px-3.5 text-gray-50 font-bold py-2 px-4">
                <Play className="w-5 h-5 mr-2" />
                    Alusta mängu
            </button>
        </div>
    )
}