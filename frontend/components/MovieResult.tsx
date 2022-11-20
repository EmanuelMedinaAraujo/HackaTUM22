import Confetti from "react-confetti"


export default function MovieResult() {

    return (
        <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <p className="text-center text-4xl py-10 text-white">Unsere Empfehlung für Dich</p>
            <div className="absolute top-1/2 transform -translate-y-1/2">
                <img className="rounded-box p-2 " src="https://www.streampicker.de/files/images/202210/0/the-santa-clauses,994442_crop16x9_1280.jpg" />
            </div>
            <Confetti />
        </div>
    )
}