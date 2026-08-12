import type { PageData } from "../../../Types/pageData";
import type { Class } from "../../../Types/class";
import { Pagination } from "../../Pagination";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import axios from "axios";

export const TableClasses = () => {
    const [pageData, setPageData] = useState<PageData>({ current_page: 1, total_pages: 1 })
    const [editingId, setEditingId] = useState<string | null>(null);

    const tableRef = useRef<HTMLTableElement>(null)
    const tableInputRef = useRef<HTMLInputElement>(null);

    const [classes, setClasses] = useState<Class[] | []>([])

    const [newModule, setNewModule] = useState<string>('')
    const [newDayOfWeek, setNewDayOfWeek] = useState<string>('')
    const [newClassTime, setNewClassTime] = useState<string>('')

    async function getClasses() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/classes?limit=12&page=${pageData.current_page}`)

            setClasses(response.data.classes)
            setPageData({
                current_page: response.data.current_page,
                total_pages: response.data.total_pages
            })
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getClasses()
    }, [pageData.current_page])

    const handleDeleteClass = (id: string) => {
        if (!id) return

        try {
            axios.delete(`http://127.0.0.1:8000/classes/remove/${id}`)
            alert('Classe deletada')
            getClasses()
        } catch (e) {
            console.error(e)
        }
    }

    const handleSaveEdits = (id: string) => {
        const classCurrentData = classes.find(c => c.id === id)
        const editionData: Record<string, string> = {}

        if (newModule && newModule !== classCurrentData?.module) {
            editionData.module = newModule
        }

        if (newDayOfWeek && newDayOfWeek !== classCurrentData?.day_of_week) {
            editionData.day_of_week = newDayOfWeek
        }

        if (newClassTime && newClassTime !== classCurrentData?.class_time) {
            editionData.class_time = newClassTime
        }

        if (Object.keys(editionData).length == 0) return

        editionData.id = id

        try {
            axios.patch('http://127.0.0.1:8000/classes/edit', editionData)
            setEditingId(null)
            getClasses()
        } catch (e) {
            console.error(e)
        }
    }

    const handleCancelEdit = () => {
        setNewDayOfWeek('')
        setNewClassTime('')
        setNewModule('')
        setEditingId(null)
    }

    return (
        <div>
            <div className="border w-full max-w-350 mx-auto py-5 px-10 rounded-2xl max-md:px-4">

                <div className="w-full overflow-x-auto whitespace-nowrap min-w-full relative">
                    <table ref={tableRef} className="w-full min-w-150 table-fixed">
                        <thead>
                            <tr className="h-15 border-b text-lg">
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Módulo</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Dia da semana</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Horário</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Data de criação</th>
                                <th scope="col" className="w-1/6 px-4 py-2 text-center">Gerenciar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes && classes.length > 0 && classes.map((c) => {
                                const isEditingThisRow = editingId === c.id;

                                return (
                                    <tr key={c.id} className="border-b text-md h-15 tr-style text-center">
                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "font-normal px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} value={isEditingThisRow ? newModule : c.module} placeholder={c.module} onChange={(e) => setNewModule(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input type="text"
                                                className={clsx(
                                                    "px-2 py-1 w-full text-center placeholder:text-white",
                                                    isEditingThisRow && 'border-b')}
                                                disabled={!isEditingThisRow} value={isEditingThisRow ? newDayOfWeek : c.day_of_week} placeholder={c.day_of_week} onChange={(e) => setNewDayOfWeek(e.target.value)} />
                                        </td>

                                        <td className="px-2 py-2">
                                            <input onChange={(e) => setNewClassTime(e.target.value)} value={isEditingThisRow ? newClassTime : c.class_time} ref={tableInputRef} type="text" placeholder={c.class_time ? c.class_time : '-'} className={clsx(
                                                "flex justify-center items-center w-full text-center placeholder:text-white",
                                                isEditingThisRow && 'border-b')} disabled={!isEditingThisRow} />
                                        </td>

                                        <td className="px-4 py-2">
                                            {c.created_at.slice(0, 10).split('-').reverse().join('/')}
                                        </td>

                                        <td className="px-4 py-2 flex gap-2 justify-center">
                                            {isEditingThisRow ?
                                                <>
                                                    <button className="bg-green-600 hover:bg-green-900 text-white px-3 py-1 rounded" onClick={() => handleSaveEdits(c.id)}>
                                                        Salvar
                                                    </button>
                                                    <button className="bg-red-600 hover:bg-red-950 text-white px-3 py-1 rounded" onClick={() => handleCancelEdit()}>
                                                        Cancelar
                                                    </button>
                                                </>
                                                :
                                                <>
                                                    <button className="bg-blue-600 hover:bg-blue-900 text-white px-3 py-1 rounded" onClick={() => setEditingId(c.id)}>
                                                        Editar
                                                    </button>
                                                    <button className="bg-red-600 hover:bg-red-950 text-white px-3 py-1 rounded" onClick={() => handleDeleteClass(c.id)}>
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