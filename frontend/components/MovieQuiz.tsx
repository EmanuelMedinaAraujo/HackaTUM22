import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Filters } from "../models/filters"
import { addFilter } from "../state/slices/quizSlice"

interface Props {
    questions: Filters,
    nextStep: () => void
}

export default function MovieQuiz(props: Props) {
    const [selected, setSelected] = useState<Array<string>>([])
    const dispatch = useDispatch()

    useEffect(() => {
        setSelected([])
    }, [props.questions])

    const handleSelect = (data: string) => {
        //If already selected, remove from selected
        //If not selected, add to selected
        if (selected.includes(data)) {
            setSelected(selected.filter((item) => item !== data))
        }
        else {
            setSelected([...selected, data])
        }
    }

    const handleNext = () => {
        dispatch(addFilter({key: props.questions.lableId, value: selected}))
        props.nextStep()
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-between ">
            <p className="text-center text-5xl mt-12 ">{props.questions.lable.charAt(0).toUpperCase() + props.questions.lable.slice(1)}</p>
            <div className="flex flex-wrap gap-2 items-center justify-center">
                {props.questions.options.map((data) => {
                    return (
                        <div
                            key={data.lable}
                            className={`border rounded-box border-black cursor-pointer px-2 py-1 ${selected.includes(data.id) ? "bg-gray-200" : ""}`}
                            onClick={() => handleSelect(data.id)}>
                            <p className={`text-2xl ${selected.includes(data.id) ? "" : ""}`}>{data.id}</p>
                        </div>
                    )
                })}
            </div>
            <button className="btn md:btn-xl md:text-2xl" onClick={handleNext}>Weiter</button>
        </div>
    )
}