import { StudentCard } from "../StudentCard";
import { useState, useEffect, useRef } from "react";
import { Earth } from "../UI/Earth"
import axios from "axios";
import { SearchComponent } from "../FormControls/SearchComponent";
import type { Student } from "../../Types/student";
import type { PageData } from "../../Types/pageData";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "../Pagination";

export const Students = () => {
    const [students, setStudents] = useState<Student[] | null>(null)
    const [studentsFromSearch, setStudentsFromSearch] = useState<Student[] | []>([])
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })
    const [searchPageData, setSearchPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })
    const divRef = useRef<HTMLDivElement>(null)

    // const [filter, setFilter] = useState<string>('students')
    // const [limit, setLimit] = useState<number>(4)

    useEffect(() => {
        async function get_students() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students?page=${pageData.current_page}`)

                setStudents(response.data.students)
                setPageData({
                    current_page: response.data.current_page,
                    total_pages: response.data.total_pages
                })
            } catch (e) {
                console.error(e)
            }
        }

        get_students()
    }, [pageData.current_page])

    useEffect(() => {
        if (!isSearching) {
            setPageData((prev) => ({
                ...prev,
                current_page: 1
            }))
        }
    }, [isSearching])

    return (
        <section className="mt-20 relative z-1 overflow-hidden" ref={divRef}>
            <Earth />
            <h2 className="text-2xl">Todos os alunos</h2>

            <form className="flex items-center gap-4 justify-center mt-10">
                <SearchComponent setStudentsFromSearch={setStudentsFromSearch} pageData={searchPageData} setPageData={setSearchPageData} setIsSearching={setIsSearching} isSearching={isSearching} />
                <button className="shine relative overflow-hidden w-11 h-11 flex text-2xl justify-center items-center rounded-lg bg-secondary-gradient transition hover:scale-110">
                    <FaSearch />
                </button>
            </form>

            <div>
                {(studentsFromSearch?.length == 0 && students && students.length > 0) ? students.map((student) => {
                    return (
                        <StudentCard key={student.id} studentData={student} />
                    )
                }) : studentsFromSearch.map((student) => {
                    return (
                        <StudentCard key={student.id} studentData={student} />
                    )
                })}
            </div>

            {studentsFromSearch && studentsFromSearch.length > 0 ?
                <Pagination divRef={divRef} pageData={searchPageData} setPageData={setSearchPageData} />
                : <Pagination divRef={divRef} pageData={pageData} setPageData={setPageData} />}

        </section>
    )
}