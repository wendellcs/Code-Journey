import { useState, useEffect, useRef } from "react"
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

interface WeekdaySelectProps {
    weekday: string,
    setWeekday: (value:string) => void
}

export const WeekdaySelect = ({weekday, setWeekday}: WeekdaySelectProps) => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            <label htmlFor="class">Dia da semana</label>
            <div role="listbox" className="mt-2.5 relative" ref={dropdownRef}>
                <p className={clsx("bg-input rounded-lg py-2 pl-1.5 shadow-input backdrop-blur-lg relative cursor-pointer", showDropdown && 'border border-purple-600')} onClick={() => setShowDropdown(!showDropdown)}>
                    {weekday}
                    <span
                        className="absolute right-5 top-2.5 bg-purple-800 rounded-full cursor-pointer hover:scale-110 transition-all"
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <IoIosArrowDown className={clsx("text-2xl transition-all", showDropdown ? 'rotate-180' : 'rotate-0')} />
                    </span>
                </p>

                <div className="bg-dropdown w-full max-w-36.5 text-center rounded-lg px-2 absolute right-0 top-10 text-white text-[14px] overflow-hidden z-10">
                    <div
                        className={clsx(
                            'transition-all duration-500 ease-in-out',
                            showDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        )}
                    >
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Segunda-feira')}>Segunda-feira</p>
                        <hr className="h-0.5" />
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Terça-feira')}>Terça-feira</p>
                        <hr className="h-0.5" />
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Quarta-feira')}>Quarta-feira</p>
                        <hr className="h-0.5" />
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Quinta-feira')}>Quinta-feira</p>
                        <hr className="h-0.5" />
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Sexta-feira')}>Sexta-feira</p>
                        <hr className="h-0.5" />
                        <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setWeekday('Sábado')}>Sábado</p>
                    </div>
                </div>
            </div>
        </div>
    )
}