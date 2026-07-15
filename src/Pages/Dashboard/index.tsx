import { useState, useEffect, useRef } from "react"
import { Students } from "../../Components/Students"
import { IoIosArrowDown } from "react-icons/io";
import clsx from "clsx";

export const Dashboard = () => {
    const [selected, setSelected] = useState<string>('Young 1')
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
        <main className="text-center py-15 relative overflow-clip bg-main-aurora">
            <h1 className="my-25 text-3xl">Cadastrar Aluno</h1>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Nome do aluno" />
                </div>

                <div>
                    <label htmlFor="surname">Sobrenome</label>
                    <input type="text" id="surname" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg focus:border focus:border-purple-600" placeholder="Sobrenome do aluno" />
                </div>

                <div>
                    <label htmlFor="class">Turma</label>
                    <div role="listbox" className="mt-2.5 relative" ref={dropdownRef}>
                        <p className={clsx("bg-input rounded-lg py-2 pl-1.5 shadow-input backdrop-blur-lg relative cursor-pointer", showDropdown && 'border border-purple-600')} onClick={() => setShowDropdown(!showDropdown)}>
                            {selected}
                            <span
                                className="absolute right-5 top-2.5 bg-purple-800 rounded-full cursor-pointer hover:scale-110 transition-all"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <IoIosArrowDown className={clsx("text-2xl transition-all", showDropdown ? 'rotate-180' : 'rotate-0')} />
                            </span>
                        </p>

                        <div className="bg-dropdown w-full max-w-36.5 text-center rounded-lg px-2 absolute right-0 top-10 text-white text-[14px] overflow-hidden">
                            <div
                                className={clsx(
                                    'transition-all duration-500 ease-in-out',
                                    showDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                )}
                            >
                                <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setSelected('Young 1')}>Young 1</p>
                                <hr className="h-0.5" />
                                <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setSelected('Young 2')}>Young 2</p>
                                <hr className="h-0.5" />
                                <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setSelected('Young 3')}>Young 3</p>
                                <hr className="h-0.5" />
                                <p role="option" className="py-2 cursor-pointer transition-all hover:text-purple-400 hover:scale-110" onClick={() => setSelected('Young 4')}>Young 4</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>

            <Students />
        </main>
    )
}