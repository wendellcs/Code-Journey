import { FaSearch } from "react-icons/fa";
import { StudentCard } from "../StudentCard";
import { useState, useEffect } from "react";
import { Earth } from "../UI/Earth"
import clsx from "clsx";
import axios from "axios";

interface Student {
    id: string
    first_name: string
    last_name: string
    tag: string | null
    age: number
    class_id: string
    created_at: string
}

export const Students = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false)

    const data = { first_name: 'Aluno', last_name: 'Teste', class: 'Young 3' }

    const [students, setStudents] = useState<Student[] | null>(null)

    useEffect(() => {
        async function get_students() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/students/all')
                setStudents(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        get_students()
    }, [])

    return (
        <section className="mt-20 relative z-1 overflow-hidden">
            <Earth />
            <h2 className="text-2xl">Todos os alunos</h2>

            <form className="flex items-center gap-4 justify-center mt-10">
                <div className={
                    clsx("relative rounded-lg p-0.5 overflow-hidden max-w-100 w-full",
                        !onFocus && 'bg-secondary-gradient w-full max-w-100 p-0.5 rounded-lg h-11'
                    )}>

                    <div className={
                        clsx("absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#a855f7_80%,transparent_30%)] animate-rotate-border",
                            !onFocus && 'hidden'
                        )}></div>
                    <input type="text" placeholder="Nome do aluno" className="relative w-full bg-[#0a0a1a] rounded-lg px-4 py-2 text-white placeholder:text-gray-500" onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)} />
                </div>
                <button className="shine relative overflow-hidden w-11 h-11 flex text-2xl justify-center items-center rounded-lg bg-secondary-gradient transition hover:scale-110">
                    <FaSearch />
                </button>
            </form>

            <div>
                {students && students.length > 0 && students.map((student) => {
                    return (
                        <StudentCard key={student.id} studentData={{first_name: student.first_name, last_name: student.last_name, class: 'Young 3'}}/>
                    )
                })}
            </div>
        </section>
    )
}