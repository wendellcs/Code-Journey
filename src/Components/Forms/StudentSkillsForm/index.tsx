import { useState } from "react"
import { StudentSelect } from "../../FormControls/StudentSelect"
import { TechSelect } from "../../FormControls/TechSelect"
import { IndependenceLevelSelect } from "../../FormControls/IndependenceLevelSelect"
import type { StudentBasicData, StudentIndependenceLevel } from "../../../Types/student"
import type { TechBasicData } from "../../../Types/tech"

import axios from "axios"

export const StudentSkillsForm = () => {
    const [selectedStudent, setSelectedStudent] = useState<StudentBasicData>({ id: '0', student_name: 'Selecione um aluno' })
    const [selectedTech, setSelectedTech] = useState<TechBasicData>({ id: '0', name: 'Selecione uma tech' })
    const [selectedIndependenceLevel, setSelectedIndependenceLevel] = useState<StudentIndependenceLevel>({ independence_level: 0  })
    const [note, setNote] = useState<string>('')

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedStudent.id === '0' || selectedTech.id === '0') return alert('Aluno e Tech são campos obrigatórios.')

        const data: Record<string, string | number> = {
            technology_id: selectedTech.id,
            independence_level: selectedIndependenceLevel.independence_level
        }

        if (note) {
            data.notes = note
        }

        try {
            await axios.post(`http://127.0.0.1:8000/students/${selectedStudent.id}/skills`, data)
            alert('Tudo certo')
        } catch (e){
            console.error(e)
        }
    }

    return (
        <div>
            <h2 className="mb-25 text-2xl max-2xl:mt-25">Evolução</h2>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10" onSubmit={(e) => { handleSubmit(e) }}>
                <StudentSelect selected={selectedStudent} setSelected={setSelectedStudent} />

                <TechSelect selected={selectedTech} setSelected={setSelectedTech} />

                <IndependenceLevelSelect selected={selectedIndependenceLevel} setSelected={setSelectedIndependenceLevel} />

                <div>
                    <label htmlFor="note">Observação</label>
                    <textarea onChange={(e) => setNote(e.target.value)} id="note" className="w-full h-30 resize-none rounded-lg mt-2.5 p-2 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Idade do aluno"></textarea>
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>
        </div>
    )
}