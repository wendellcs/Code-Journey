import { useState } from "react"
import axios from "axios"
import { ClassSelect } from "../../FormControls/ClassSelect"
import type { ClassBasicData } from "../../../Types/class"
import { getAuthHeader } from "../../../Utilities/authService"

export const StudentForm = () => {
    const [errorState, setErrorState] = useState<boolean>(false)

    const [userName, setUserName] = useState<string>('')
    const [userSurname, setUserSurname] = useState<string>('')
    const [userAge, setUserAge] = useState<number>(0)
    const [userTag, setUserTag] = useState<string>()

    const [selected, setSelected] = useState<ClassBasicData>({
        id: '0',
        module: 'Selecione uma turma',
        day_of_week: '-',
        class_time: '-'
    })

    interface Student {
        first_name: string,
        last_name: string,
        age: number,
        current_module: string,
        class_id: string,
        tag: string | undefined
    }


    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!userName || !userSurname || !userAge) {
            setErrorState(true)
        }

        if (Number(userAge) < 12) {
            alert('O aluno precisa ter pelo menos 12 anos.')
            return
        }

        if (selected.id === '0') return alert('Selecione uma turma válida!')

        setErrorState(false)

        const student: Student = {
            first_name: userName,
            last_name: userSurname,
            age: Number(userAge),
            current_module: selected.module,
            class_id: selected.id,
            tag: userTag
        }

        try {
            await axios.post('http://127.0.0.1:8000/students/add', student, getAuthHeader())
            alert('Aluno adicionado com sucesso!')
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <h2 className="mb-25 text-2xl max-2xl:mt-25">Cadastrar Aluno</h2>

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

                <ClassSelect selected={selected} setSelected={setSelected} />

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </div>
    )
}