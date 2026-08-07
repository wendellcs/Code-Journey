import { useEffect, useState } from "react"
import { StudentSelect } from "../../FormControls/StudentSelect"
import { TechSelect } from "../../FormControls/TechSelect"
import { IndependenceLevelSelect } from "../../FormControls/IndependenceLevelSelect"
import type { StudentBasicData, StudentIndependenceLevel } from "../../../Types/student"
import type { TechBasicData } from "../../../Types/tech"
import type { StudentSkill } from "../../../Types/student"
import clsx from "clsx"

import axios from "axios"
import { ConstNode } from "three/webgpu"

export const StudentSkillsForm = () => {
    const [selectedStudent, setSelectedStudent] = useState<StudentBasicData>({ id: '0', student_name: 'Selecione um aluno' })
    const [selectedTech, setSelectedTech] = useState<TechBasicData>({ id: '0', name: 'Selecione uma tech' })
    const [selectedIndependenceLevel, setSelectedIndependenceLevel] = useState<StudentIndependenceLevel>({ independence_level: 0 })
    const [note, setNote] = useState<string>('')

    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const [studentSkills, setStudentSkills] = useState<StudentSkill[]>([])

    const handleAddStudentSkill = async () => {
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
        } catch (e) {
            console.error(e)
        }
    }

    const handleUpdateStudentSkill = async () => {
        try {
            if (selectedStudent.id === '0' || selectedTech.id === '0') return

            const currentData = studentSkills.find(skill => skill.technology_id === selectedTech.id)
            const editionData:Record<string, string | number> = {}

            if ( Number(currentData?.independence_level) !== selectedIndependenceLevel.independence_level) {
                editionData.independence_level = selectedIndependenceLevel.independence_level
            }

            const currentNote = currentData?.notes ?? ''
            const newNote = note ?? ''

            if (currentNote !== newNote){
                editionData.notes = note
            }

            if (Object.keys(editionData).length === 0) return

            console.log(editionData)
            
            try {
                await axios.patch(`http://127.0.0.1:8000/students/${currentData?.id}/skills`, editionData)
                alert('Skills do aluno atualizadas com sucesso!')
            } catch (e) {
                console.error(e)
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (selectedStudent.id === '0' || selectedTech.id === '0') return alert('Aluno e Tech são campos obrigatórios.')

        if (!isEditMode) {
            handleAddStudentSkill()
            return
        }

        handleUpdateStudentSkill()
    }

    useEffect(() => {
        const getStudentSkills = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students/${selectedStudent.id}/skills`)
                setStudentSkills(response.data)
            } catch (e) {
                setStudentSkills([])
                setSelectedTech({ id: '0', name: 'Selecione uma tech' })
                setSelectedIndependenceLevel({ independence_level: 0 })
                alert('O aluno não tem techs registradas')
                console.error(e)
            }
        }

        if (isEditMode && selectedStudent.id !== '0') {
            getStudentSkills()
        }
    }, [selectedStudent])

    useEffect(() => {
        if (studentSkills.length > 0 && selectedTech.id !== '0' && isEditMode) {
            const student = studentSkills.find(skill => skill.technology_id === selectedTech.id)
            let value = student?.independence_level ? student?.independence_level : 0

            if (student?.notes) {
                setNote(student.notes)
            }

            if (value !== selectedIndependenceLevel.independence_level) {
                setSelectedIndependenceLevel({ independence_level: value as 0 | 1 | 2 | 3 | 4 | 5 })
            }
        }
    }, [selectedTech, studentSkills])


    useEffect(() => {
        setSelectedStudent({ id: '0', student_name: 'Selecione um aluno' })
        setSelectedTech({ id: '0', name: 'Selecione uma tech' })
        setSelectedIndependenceLevel({ independence_level: 0 })
        setNote('')
    }, [isEditMode])

    return (
        <div>
            <h2 className="mb-25 text-2xl max-2xl:mt-25">Evolução</h2>


            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10" onSubmit={(e) => { handleSubmit(e) }}>
                <button className={clsx("w-35 border p-2 rounded-lg",
                    isEditMode ? 'border-green-400 text-green-400' : 'border-blue-400 text-blue-400')} type="button" onClick={() => setIsEditMode(!isEditMode)}>Mode: {isEditMode ? 'Edição' : 'Criação'}</button>
                <StudentSelect selected={selectedStudent} setSelected={setSelectedStudent} />

                <TechSelect selected={selectedTech} setSelected={setSelectedTech} isEditMode= {isEditMode} studentSkills = {studentSkills}/>

                <IndependenceLevelSelect selected={selectedIndependenceLevel} setSelected={setSelectedIndependenceLevel}/>

                <div>
                    <label htmlFor="note">Observação</label>
                    <textarea onChange={(e) => setNote(e.target.value)} value={note} id="note" className="w-full h-30 resize-none rounded-lg mt-2.5 p-2 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Observações sobre o progresso do aluno"></textarea>
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">{isEditMode ? 'Atualizar' : 'Adicionar'}</button>
            </form>
        </div>
    )
}