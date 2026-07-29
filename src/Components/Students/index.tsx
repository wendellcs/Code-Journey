import { FaSearch } from "react-icons/fa";
import { StudentCard } from "../StudentCard";
import { useState } from "react";
import { Earth } from "../../Components/Earth"
import clsx from "clsx";

export const Students = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false)

    return (
        <section className="mt-20 relative z-1 overflow-hidden">
            <Earth />
            <h2 className="text-2xl">Todos os alunos</h2>

            <form className="flex items-center gap-4 justify-center mt-10">
                <div className={
                    clsx("relative rounded-lg p-0.5 overflow-hidden max-w-100 w-full",
                        !onFocus && 'bg-secondary-gradient w-full max-w-100 p-0.5 rounded-lg h-11'
                    )}>

                    <div className={
                        clsx("absolute -inset-full bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,#a855f7_80%,transparent_30%)] animate-rotate-border",
                            !onFocus && 'hidden'
                        )}></div>
                    <input type="text" placeholder="Nome do aluno" className="relative w-full bg-[#0a0a1a] rounded-lg px-4 py-2 text-white placeholder:text-gray-500" onFocus={() => setOnFocus(true)} onBlur={() => setOnFocus(false)} />
                </div>
                <button className="shine relative overflow-hidden w-11 h-11 flex text-2xl justify-center items-center rounded-lg bg-secondary-gradient transition hover:scale-110">
                    <FaSearch />
                </button>
            </form>

            <div>
                <StudentCard />
            </div>
        </section>
    )
}