import { useState, useRef } from "react"
import { ModuleSelect } from "../../FormControls/ModuleSelect"
import { WeekdaySelect } from "../../FormControls/WeekdaySelect"
import axios from "axios"

export const StudentForm = () => {
    const [errorState, setErrorState] = useState<boolean>(false)

    // Student data
    const [userName, setUserName] = useState<string>('')
    const [userSurname, setUserSurname] = useState<string>('')
    const [userAge, setUserAge] = useState<number>(0)
    const [userTag, setUserTag] = useState<string>()

    // Class data
    const [selected, setSelected] = useState<string>('Young 1')
    const [weekday, setWeekday] = useState<string>('Segunda-feira')
    const [classTime, setClassTime] = useState<string>('')

    const inputRef = useRef<HTMLInputElement>(null);

    // It will be used in the next update.
    // type Ranking = {
    //     classRanking: number,
    //     generalRanking: number
    // }

    // type Learned = {
    //     tech: string,
    //     learnedTechTopics: string[],
    //     level: 1 | 2 | 3 | 4 | 5
    // }

    interface Student {
        first_name: string,
        last_name: string,
        age: number,
        current_module: string,
        class_id: string,
        tag: string | undefined
    }

    const getStudentClassId = async () => {
        if (!classTime){
            alert('Informe o horário da turma.')
            return
        }

        const studentClassData = {
            module: selected,
            day_of_week: weekday,
            class_time: classTime
        }

        try {
            const response = await axios.get(`http://127.0.0.1:8000/classes/find?module=${studentClassData.module}&day_of_week=${studentClassData.day_of_week}&class_time=${studentClassData.class_time}`)
            return response.data.id
        } catch (e) {
            console.error(e)
        }
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!userName || !userSurname || !userAge) {
            setErrorState(true)
        }

        if (Number(userAge) < 12){
            alert('O aluno precisa ter pelo menos 12 anos.')
            return
        }

        const class_id = await getStudentClassId()

        if (!class_id) return alert('Turma não encontrada')
        
        setErrorState(false)

        const student: Student = {
            first_name: userName,
            last_name: userSurname,
            age: Number(userAge),
            current_module: selected,
            class_id: class_id,
            tag: userTag
        }
        
        try {
            await axios.post('http://127.0.0.1:8000/students/add', student)
            alert('Aluno adicionado com sucesso!')
        } catch(e){
            console.error(e)
        }
    }

    return (
        <>
            <h2 className="my-20 text-2xl">Cadastrar Aluno</h2>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10" onSubmit={(e) => { handleSubmit(e) }}>
                <div>
                    <label htmlFor="name">Nome</label>
                    <input onChange={(e) => setUserName(e.target.value)} type="text" id="name" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Nome do aluno" />
                </div>

                <div>
                    <label htmlFor="surname">Sobrenome</label>
                    <input onChange={(e) => setUserSurname(e.target.value)} type="text" id="surname" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Sobrenome do aluno" />
                </div>

                <div>
                    <label htmlFor="age">Idade</label>
                    <input onChange={(e) => setUserAge(Number(e.target.value))} type="number" id="age" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Idade do aluno" />
                </div>

                <div>
                    <label htmlFor="tag">Tag ( Apenas para os escolhidos )</label>
                    <input onChange={(e) => setUserTag(e.target.value)} type="text" id="tag" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Tag do aluno" />
                </div>

                <ModuleSelect selected={selected} setSelected={setSelected} />

                <WeekdaySelect weekday={weekday} setWeekday={setWeekday} />

                <div>
                    <label htmlFor="time">Horário</label>
                    <div onClick={() => inputRef.current?.showPicker()} className="cursor-pointer">

                        <input onChange={(e) => setClassTime(e.target.value)} value={classTime} ref={inputRef} type="time" id="time" placeholder="00:00" className="w-full pointer-events-none h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" />
                    </div>
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </>
    )
}