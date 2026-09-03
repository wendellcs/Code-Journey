import { useState, useEffect, useRef, useMemo } from "react"
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";
import axios from "axios";
import type { Tech, TechBasicData } from "../../../Types/tech";
import type { StudentSkill } from "../../../Types/student";

interface TechSelectProps {
    selected: TechBasicData | null,
    setSelected: React.Dispatch<React.SetStateAction<TechBasicData>>
    isEditMode: boolean
    studentSkills: StudentSkill[] | []
}

export const TechSelect = ({ selected, setSelected, isEditMode, studentSkills }: TechSelectProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [techs, setTechs] = useState<Tech[]>([])

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function getTechs() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/techs/all`)
                console.log(response.data)
                setTechs(response.data)
            } catch (e) {
                console.error(e)
            }
        }

        getTechs()

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

    const normalizedStudentSkills = useMemo(() => {
        if (!studentSkills) return [];

        const studentSkillsAbove0 = studentSkills.filter(skill => Number(skill.independence_level) > 0)

        return studentSkillsAbove0.map(tech => ({
            id: tech.technology_id,
            name: tech.name
        }));
    }, [studentSkills]);

    const renderData = isEditMode ? normalizedStudentSkills : techs

    return (
        <div>
            <label htmlFor="class">Tech</label>

            <div role="listbox" className="mt-2.5 relative" ref={dropdownRef}>
                <p className={clsx("bg-input rounded-lg py-2 pl-1.5 shadow-input backdrop-blur-lg relative cursor-pointer", showDropdown && 'border border-purple-600')} onClick={() => setShowDropdown(!showDropdown)}>
                    {selected?.name}
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
                        {renderData && renderData.length > 0 && renderData.map((tech) => {
                            return (
                                <p role="option" key={tech.id} className="py-2 cursor-pointer transition-all border-b last-of-type:border-none hover:text-purple-400"
                                    onClick={() => setSelected(
                                        {
                                            id: tech.id,
                                            name: tech.name
                                        })}>{tech.name}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}