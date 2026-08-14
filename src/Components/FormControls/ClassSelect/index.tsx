import { useState, useRef, useEffect } from "react"
import { IoIosArrowDown } from "react-icons/io"
import type { Class, ClassBasicData } from "../../../Types/class"
import clsx from "clsx"
import axios from "axios"

interface ClassSelectProps {
    selected: ClassBasicData | null,
    setSelected: React.Dispatch<React.SetStateAction<ClassBasicData>>
}


export const ClassSelect = ({ selected, setSelected }: ClassSelectProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [classes, setClasses] = useState<Class[]>([])
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function getClasses() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/classes/all`)
                setClasses(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        getClasses()
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    return (
        <div>
            <label htmlFor="class">Turmas</label>

            <div role="listbox" className="mt-2.5 relative" ref={dropdownRef}>
                <p className={clsx("bg-input rounded-lg py-2 pl-1.5 shadow-input backdrop-blur-lg relative cursor-pointer", showDropdown && 'border border-purple-600')} onClick={() => setShowDropdown(!showDropdown)}>
                    {selected?.module === 'Selecione uma turma' ? selected?.module : `${selected?.module} | ${selected?.day_of_week} | ${selected?.class_time}`}
                    <span
                        className="absolute right-5 top-2.5 bg-purple-800 rounded-full cursor-pointer hover:scale-110 transition-all"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <IoIosArrowDown className={clsx("text-2xl transition-all", showDropdown ? 'rotate-180' : 'rotate-0')} />
                    </span>
                </p>

                <div className="bg-dropdown w-full max-w-80 text-center rounded-lg px-2 absolute right-0 top-10 text-white text-[14px] overflow-hidden z-10">
                    <div
                        className={clsx(
                            'transition-all duration-500 ease-in-out',
                            showDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        )}
                    >
                        {classes && classes.length > 0 && classes.map((c) => {
                            return (
                                <p role="option" key={c.id} className="py-2 cursor-pointer transition-all border-b last-of-type:border-none hover:text-purple-400"
                                    onClick={() => setSelected(
                                        {
                                            id: c.id,
                                            module: c.module,
                                            day_of_week: c.day_of_week,
                                            class_time: c.class_time
                                        })}>{c.module} | {c.day_of_week} | {c.class_time}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}