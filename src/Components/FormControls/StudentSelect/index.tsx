import { useState, useEffect, useRef } from "react"
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import type { Student } from "../../../Types/student";
import axios from "axios";

import type { StudentBasicData } from "../../../Types/student";

interface StudentSelectProps {
    selected: StudentBasicData | null,
    setSelected: React.Dispatch<React.SetStateAction<StudentBasicData>>
}

export const StudentSelect = ({ selected, setSelected }: StudentSelectProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [students, setStudents] = useState<Student[] | []>([])

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function getStudents() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/all`)
                setStudents(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        getStudents()

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div>
            <label htmlFor="class">Aluno</label>

            <div role="listbox" className="mt-2.5 relative" ref={dropdownRef}>
                <p className={clsx("bg-input rounded-lg py-2 pl-1.5 shadow-input backdrop-blur-lg relative cursor-pointer", showDropdown && 'border border-purple-600')} onClick={() => setShowDropdown(!showDropdown)}>
                    {selected?.student_name}
                    <span
                        className="absolute right-5 top-2.5 bg-purple-800 rounded-full cursor-pointer hover:scale-110 transition-all"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <IoIosArrowDown className={clsx("text-2xl transition-all", showDropdown ? 'rotate-180' : 'rotate-0')} />
                    </span>
                </p>

                <div className="bg-dropdown w-full max-w-60 text-center rounded-lg px-2 absolute right-0 top-10 text-white text-[14px] overflow-hidden z-10">
                    <div
                        className={clsx(
                            'transition-all duration-500 ease-in-out',
                            showDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        )}
                    >
                        {students && students.length > 0 && students.map((student) => {
                            return (
                                <p role="option" key={student.id} className="py-2 cursor-pointer transition-all border-b last-of-type:border-none hover:text-purple-400"
                                    onClick={() => setSelected(
                                        {
                                            id: student.id,
                                            student_name: `${student.first_name} ${student.last_name}`
                                        })}>{`${student.first_name} ${student.last_name}`}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}