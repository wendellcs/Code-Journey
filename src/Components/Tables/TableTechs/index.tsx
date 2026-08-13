import type { PageData } from "../../../Types/pageData";
import type { Tech } from "../../../Types/tech";
import { Pagination } from "../../Pagination";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";
import { getAuthHeader } from "../../../Utilities/authService";


export const TableTechs = () => {
    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })
    const [editingId, setEditingId] = useState<string | null>(null);
    const tableRef = useRef<HTMLTableElement>(null)

    const [techs, setTechs] = useState<Tech[] | []>([])

    const [newName, setNewName] = useState<string>('')
    const [newIcon, setNewIcon] = useState<string>('')
    const [newCourseId, setNewCourseId] = useState<string>('')


    async function getTechs() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/techs?limit=12&page=${pageData.current_page}`)

            setTechs(response.data.techs)
            setPageData({
                current_page: response.data.current_page,
                total_pages: response.data.total_pages
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getTechs()
    }, [pageData.current_page])


    const handleDeleteTech = (id: string) => {
        if (!id) return

        try {
            axios.delete(`http://127.0.0.1:8000/techs/remove/${id}`, getAuthHeader())
            alert('Tech deletada')
            getTechs()
        } catch (e) {
            console.error(e)
        }
    }

    const handleSaveEdits = (id: string) => {
        const techCurrentData = techs.find(tech => tech.id === id)
        const editionData: Record<string, string> = {}

        if (newName && newName !== techCurrentData?.name) {
            editionData.name = newName
        }

        if (newIcon && newIcon !== techCurrentData?.tech_icon) {
            editionData.tech_icon = newIcon
        }

        if (newCourseId && newCourseId !== techCurrentData?.course_id) {
            editionData.class_id = newCourseId
        }

        if (Object.keys(editionData).length == 0) return

        editionData.id = id

        try {
            axios.patch('http://127.0.0.1:8000/techs/edit', editionData, getAuthHeader())
            setEditingId(null)
            getTechs()
        } catch (e) {
            console.error(e)
        }
    }

    const handleCancelEdit = () => {
        setNewName('')
        setNewIcon('')
        setNewCourseId('')
        setEditingId(null)
    }

    return (
        <div>
            <div className="border w-full max-w-350 mx-auto py-5 px-10 rounded-2xl max-md:px-4">

                <div className="w-full overflow-x-auto whitespace-nowrap min-w-full relative">
                    <table ref={tableRef} className="w-full min-w-150 table-fixed">
                        <thead>
                            <tr className="h-15 border-b text-lg">
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Tech</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Ícone</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Id do curso</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Data de criação</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Gerenciar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {techs && techs.length > 0 && techs.map((tech) => {
                                const isEditingThisRow = editingId === tech.id;

                                return (
                                    <tr key={tech.id} className="border-b text-md h-15 tr-style text-center">
                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "font-normal px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} value={isEditingThisRow ? newName : tech.name} placeholder={tech.name} onChange={(e) => setNewName(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} value={isEditingThisRow ? newIcon : tech.tech_icon} placeholder={tech.tech_icon} onChange={(e) => setNewIcon(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} value={isEditingThisRow ? newCourseId : tech.course_id ? tech.course_id : '-'} placeholder={tech.course_id ? tech.course_id : '-'} onChange={(e) => setNewCourseId(e.target.value)} />
                                        </td>

                                        <td className="px-4 py-2">
                                            {tech.created_at.slice(0, 10).split('-').reverse().join('/')}
                                        </td>

                                        <td className="px-4 py-2 flex gap-2 justify-center">
                                            {isEditingThisRow ?
                                                <>
                                                    <button className="bg-green-600 hover:bg-green-900 text-white px-3 py-1 rounded" onClick={() => handleSaveEdits(tech.id)}>
                                                        Salvar
                                                    </button>
                                                    <button className="bg-red-600 hover:bg-red-950 text-white px-3 py-1 rounded" onClick={() => handleCancelEdit()}>
                                                        Cancelar
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button className="bg-blue-600 hover:bg-blue-900 text-white px-3 py-1 rounded" onClick={() => setEditingId(tech.id)}>
                                                        Editar
                                                    </button>
                                                    <button className="bg-red-600 hover:bg-red-950 text-white px-3 py-1 rounded" onClick={() => handleDeleteTech(tech.id)}>
                                                        Excluir
                                                    </button>
                                                </>
                                            }

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