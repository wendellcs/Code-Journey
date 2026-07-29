import { useState } from "react"
import { ModuleSelect } from "../ModuleSelect"

export const StudentForm = () => {
    const [errorState, setErrorState] = useState<boolean>(false)

    const [userName, setUserName] = useState<string>('')
    const [userSurname, setUserSurname] = useState<string>('')
    const [userAge, setUserAge] = useState<number>(0)

    const [selected, setSelected] = useState<string>('Young 1')

    type Ranking = {
        classRanking: number,
        generalRanking: number
    }

    type Learned = {
        tech: string,
        learnedTechTopics: string[],
        level: 1 | 2 | 3 | 4 | 5
    }

    interface Student {
        name: string,
        surname: string,
        age: number,
        module: string,
        learned: Learned[],
        ranking: Ranking,
        strengths: string[],
        weaknesses: string[]
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!userName || !userSurname || !userAge) {
            setErrorState(true)
        }

        setErrorState(false)

        const student: Student = {
            name: userName,
            surname: userSurname,
            age: userAge,
            module: selected,
            learned: [],
            ranking: {
                classRanking: 0,
                generalRanking: 0
            },
            strengths: [],
            weaknesses: []
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
                    <input onChange={(e) => setUserAge(Number(e.target.value))} type="number" id="age" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Sobrenome do aluno" />
                </div>

                <ModuleSelect selected={selected} setSelected={setSelected} />

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </>
    )
}