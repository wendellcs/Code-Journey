import { useState, useRef } from "react"
import { ModuleSelect } from "../../FormControls/ModuleSelect"
import { WeekdaySelect } from "../../FormControls/WeekdaySelect"
import axios from "axios"
import { getAuthHeader } from "../../../Utilities/authService"

export const ClassForm = () => {
    const [classTime, setClassTime] = useState('')
    const [selected, setSelected] = useState<string>('Young 1')
    const [weekday, setWeekday] = useState<string>('Segunda-feira')

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!classTime || !selected || !weekday){
            return
        }

        // Criar limite de horários

        const classData = {
            module: selected,
            day_of_week: weekday,
            class_time: classTime
        }

        try {
            await axios.post('http://127.0.0.1:8000/classes/add', classData, getAuthHeader())
            alert('Turma criada') // Criar um popup
        } catch (e){
            console.error(e)
        }
    }

    return (
        <div>
            <h2 className="mb-25 text-2xl">Cadastrar Turma</h2>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10" onSubmit={(e) => { handleSubmit(e) }}>
                <ModuleSelect selected={selected} setSelected={setSelected} />

                <div>
                    <label htmlFor="time">Horário</label>
                    <div onClick={() => inputRef.current?.showPicker()} className="cursor-pointer">

                        <input onChange={(e) => setClassTime(e.target.value)} value={classTime} ref={inputRef} type="time" id="time" placeholder="00:00" className="w-full pointer-events-none h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" />
                    </div>
                </div>

                <WeekdaySelect weekday={weekday} setWeekday={setWeekday}/>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </div>
    )
}