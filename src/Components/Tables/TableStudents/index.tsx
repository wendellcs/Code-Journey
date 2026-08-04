import { useEffect, useRef, useState } from "react"
import { Pagination } from "../../Pagination"
import axios from "axios"
import type { Student } from "../../../Types/student"
import type { PageData } from "../../../Types/pageData"
import { TDSLoader } from "three/examples/jsm/Addons.js"

export const TableStudents = () => {
    const [students, setStudents] = useState<Student[] | []>([])
    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })

    const tableRef = useRef<HTMLTableElement>(null)

    useEffect(() => {
        async function getStudents() {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/students?limit=12&page=${pageData.current_page}`)

                setStudents(response.data.students)
                setPageData({
                    current_page: response.data.current_page,
                    total_pages: response.data.total_pages
                })

            } catch (e) {
                console.error(e)
            }
        }

        getStudents()
    }, [pageData.current_page])

    const handleDeleteStudent = async (id: string) => {
        console.log(id)
    }

    const handleEditStudent = async (id: string) => {
        console.log(id)
    }

    return (
        <div>
            <div className="border w-full max-w-350 mx-auto py-5 px-10 rounded-2xl max-md:px-4">

                <div className="w-full overflow-x-auto whitespace-nowrap min-w-full">
                    <table ref={tableRef} className="w-full min-w-150">
                        <thead>
                            <tr className="h-15 border-b text-lg">
                                <th scope="col" className="px-4 py-2">Nome</th>
                                <th scope="col" className="px-4 py-2">Sobrenome</th>
                                <th scope="col" className="px-4 py-2">Módulo</th>
                                <th scope="col" className="px-4 py-2">Tag</th>
                                <th scope="col" className="px-4 py-2">Data de criação</th>
                                <th scope="col" className="px-4 py-2 ">Gerenciar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.length > 0 && students.map((student) => {
                                return (
                                    <tr key={student.id} className="border-b text-md h-15 tr-style">
                                        <th scope="row" className="px-4 py-2  font-normal">{student.first_name}</th>
                                        <td className="px-4 py-2">{student.last_name}</td>
                                        <td className="px-4 py-2">{student.current_module}</td>
                                        <td className="px-4 py-2">
                                            {student.tag ? (
                                                <span className="bg-gray-800 text-white px-2 py-1 rounded text-s font-semibold">
                                                    {student.tag}
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">{student.created_at.slice(0, 10).split('-').reverse().join('/')}</td>

                                        <td className="w-48 px-4 py-2">
                                            <div className="flex gap-2 w-full p-1">
                                                <button className="flex-1 transition px-1 bg-blue-600 hover:bg-blue-900 text-white h-10 rounded font-medium" onClick={() => handleEditStudent(student.id)}>
                                                    Editar
                                                </button>
                                                <button className="flex-1 transition px-1 bg-red-600 hover:bg-red-950 text-white h-10 rounded font-medium" onClick={() => handleDeleteStudent(student.id)}>
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination elementRef={tableRef} pageData={pageData} setPageData={setPageData} />
        </div>
    )
}