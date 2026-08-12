import React, { useState, useEffect } from "react"
import { useDebounce } from "../../../Utilities/debounce"
import axios from "axios"
import clsx from "clsx"
import type { Student } from "../../../Types/student"
import type { PageData } from "../../../Types/pageData"

interface SearchComponentProps {
    setStudentsFromSearch: React.Dispatch<React.SetStateAction<Student[] | []>>
    pageData: PageData
    setPageData: React.Dispatch<React.SetStateAction<PageData>>
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
    isSearching: boolean
}

export const SearchComponent = ({ setStudentsFromSearch, pageData, setPageData, setIsSearching }: SearchComponentProps) => {
    const [onFocus, setOnFocus] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const debouncedSearch = useDebounce(search, 400);

    useEffect(() => {
        if (debouncedSearch){
            setIsSearching(debouncedSearch.length >= 3);
        }
    }, [debouncedSearch, setIsSearching]);

    useEffect(() => {
        async function handleSearch() {
            if (debouncedSearch && debouncedSearch.length >= 3) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/students?page=${pageData.current_page}&search=${debouncedSearch}`)

                    setStudentsFromSearch(response.data.students)
                    setPageData({
                        current_page: response.data.current_page,
                        total_pages: response.data.total_pages
                    })
                } catch (e) {
                    console.error(e)
                }
            }
        }

        handleSearch()

    }, [debouncedSearch, pageData.current_page, setPageData, setStudentsFromSearch]);

    return (
        <div className={
            clsx("relative rounded-lg p-0.5 overflow-hidden max-w-100 w-full",
                !onFocus && 'bg-secondary-gradient w-full max-w-100 p-0.5 rounded-lg h-11')}>

            <div className={
                clsx("absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#a855f7_80%,transparent_30%)] animate-rotate-border",
                    !onFocus && 'hidden')}></div>
            <input
                type="text"
                onChange={(e) => {
                    const val = e.target.value;
                    setSearch(val);

                    if (val === "") {
                        setStudentsFromSearch([])
                        setIsSearching(false);
                        setPageData(prev => ({ ...prev, current_page: 1 }));
                    }
                }}
                placeholder="Nome do aluno"
                className="relative w-full bg-[#0a0a1a] rounded-lg px-4 py-2 text-white placeholder:text-gray-500"
                onFocus={() => setOnFocus(true)}
                onBlur={() => setOnFocus(false)}
            />
        </div>
    )
}