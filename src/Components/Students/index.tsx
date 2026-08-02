import { StudentCard } from "../StudentCard";
import { useState, useEffect } from "react";
import { Earth } from "../UI/Earth"
import clsx from "clsx";
import axios from "axios";

import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Student {
    id: string
    first_name: string
    last_name: string
    current_module: string
    tag: string | null
    age: number
    class_id: string
    created_at: string
}

interface PageData {
    current_page: number,
    total_pages: number
}

export const Students = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false)

    const [students, setStudents] = useState<Student[] | null>(null)
    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })

    const [filter, setFilter] = useState<string>('students')
    const [limit, setLimit] = useState<number>(4)

    const isFirstPage = pageData.current_page <= 1
    const isLastPage = pageData.current_page >= pageData.total_pages

    const handleNextPage = () => {
        if (!isLastPage) {
            setPageData((prev) => ({ ...prev, current_page: prev.current_page + 1 }))
        }
    }

    const handlePrevPage = () => {
        if (!isFirstPage) {
            setPageData((prev) => ({ ...prev, current_page: prev.current_page - 1 }))
        }
    }

    const handleFirstPage = () => {
        setPageData((prev) => ({ ...prev, current_page: 1 }))
    }

    const handleLastPage = () => {
        setPageData((prev) => ({ ...prev, current_page: prev.total_pages}))
    }


    useEffect(() => {
        async function get_students() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students?page=${pageData.current_page}`)
                setStudents(response.data.students)
                setPageData({ current_page: response.data.current_page, total_pages: response.data.total_pages })

                setPageData((prev) => ({
                    ...prev,
                    total_pages: response.data.total_pages
                }))
            } catch (e) {
                console.error(e)
            }
        }

        get_students()
    }, [pageData.current_page])

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
                        <StudentCard key={student.id} studentData={{ first_name: student.first_name, last_name: student.last_name, class: student.current_module }} />
                    )
                })}
            </div>

            {students && students.length > 0 &&
                <div className="flex items-center justify-center min-h-10 mb-5 mt-20">
                    <div onClick={handlePrevPage} className={clsx("p-1 rounded-lg mr-2 transition hover:scale-110",
                        isFirstPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
                    )}>
                        <MdKeyboardArrowLeft className="text-4xl" />
                    </div>
                    <div onClick={handleFirstPage} className={clsx(" p-1 rounded-lg transition hover:scale-110",
                        isFirstPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
                    )}>
                        <MdOutlineKeyboardDoubleArrowLeft className="text-4xl" />
                    </div>

                    <p className="text-3xl mx-10">{pageData.current_page}</p>

                    <div onClick={handleLastPage} className={clsx("p-1 rounded-lg mr-2 transition hover:scale-110",
                        isLastPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
                    )}>
                        <MdOutlineKeyboardDoubleArrowRight className="text-4xl" />
                    </div>
                    <div onClick={handleNextPage} className={clsx(" p-1 rounded-lg transition hover:scale-110",
                        isLastPage ? 'bg-primary-gradient cursor-default hover:scale-none' : 'cursor-pointer bg-secondary-gradient'
                    )}>
                        <MdKeyboardArrowRight className="text-4xl" />
                    </div>
                </div>
            }

        </section>
    )
}