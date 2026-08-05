import { useEffect, useRef, useState } from "react"
import { Pagination } from "../../Pagination"
import axios from "axios"
import type { Student } from "../../../Types/student"
import type { PageData } from "../../../Types/pageData"
import clsx from "clsx"

export const TableStudents = () => {
    const [editingId, setEditingId] = useState<string | null>(null);

    const [newFirstName, setNewFirstName] = useState<string>('')
    const [newLastName, setNewLastName] = useState<string>('')
    const [newCurrentModule, setNewCurrentModule] = useState<string>('')
    const [newTag, setNewTag] = useState<string>('')

    const [students, setStudents] = useState<Student[] | []>([])
    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })

    const tableRef = useRef<HTMLTableElement>(null)

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

    useEffect(() => {
        getStudents()
    }, [pageData.current_page])

    const handleDeleteStudent = async (id: string) => {
        if (!id) return

        try {
            axios.delete(`http://127.0.0.1:8000/students/remove/${id}`)
            alert('Aluno deletado')
            getStudents()
        } catch (e) {
            console.log(e)
        }
    }

    const handleSaveEdits = (id: string) => {
        const studentCurrentData = students.find(student => student.id === id)
        const editionData: Record<string, string> = {}

        if (newFirstName && newFirstName !== studentCurrentData?.first_name) {
            editionData.first_name = newFirstName
        }

        if (newLastName && newLastName !== studentCurrentData?.last_name) {
            editionData.last_name = newLastName
        }

        if (newCurrentModule && newCurrentModule !== studentCurrentData?.current_module) {
            editionData.current_module = newCurrentModule
        }

        if (newTag && newTag !== studentCurrentData?.tag) {
            editionData.tag = newTag
        }

        if (Object.keys(editionData).length == 0 ) return

        editionData.id = id

        try {
            axios.patch('http://127.0.0.1:8000/students/edit', editionData)
            setEditingId(null)
            getStudents()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div className="border w-full max-w-350 mx-auto py-5 px-10 rounded-2xl max-md:px-4">

                <div className="w-full overflow-x-auto whitespace-nowrap min-w-full relative">
                    <table ref={tableRef} className="w-full min-w-150 table-fixed">
                        <thead>
                            <tr className="h-15 border-b text-lg">
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Nome</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Sobrenome</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Módulo</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Tag</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Data de criação</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Gerenciar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students && students.length > 0 && students.map((student) => {
                                const isEditingThisRow = editingId === student.id;

                                return (
                                    <tr key={student.id} className="border-b text-md h-15 tr-style text-center">
                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "font-normal px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} placeholder={student.first_name} onChange={(e) => setNewFirstName(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} placeholder={student.last_name} onChange={(e) => setNewLastName(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} placeholder={student.current_module} onChange={(e) => setNewCurrentModule(e.target.value)} />
                                        </td>

                                        <td className="px-4 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "field-sizing-content bg-gray-800 text-white px-2 py-1 rounded text-s font-semibold placeholder:text-white text-center",
                                                    isEditingThisRow && 'border')}
                                                disabled={!isEditingThisRow} placeholder={student.tag ? student.tag : '-'} onChange={(e) => setNewTag(e.target.value)} />
                                        </td>

                                        <td className="px-4 py-2">
                                            {student.created_at.slice(0, 10).split('-').reverse().join('/')}
                                        </td>

                                        <td className="px-4 py-2 flex gap-2 justify-center">
                                            {isEditingThisRow ?
                                                <button className="bg-green-600 hover:bg-green-900 text-white px-3 py-1 rounded" onClick={() => handleSaveEdits(student.id)}>
                                                    Salvar
                                                </button>
                                                :
                                                <button className="bg-blue-600 hover:bg-blue-900 text-white px-3 py-1 rounded" onClick={() => setEditingId(student.id)}>
                                                    Editar
                                                </button>
                                            }
                                            <button className="bg-red-600 hover:bg-red-950 text-white px-3 py-1 rounded" onClick={() => handleDeleteStudent(student.id)}>
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <Pagination elementRef={tableRef} pageData={pageData} setPageData={setPageData} />
        </div >
    )
}