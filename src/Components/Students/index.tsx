import { FaSearch } from "react-icons/fa";
import { StudentCard } from "../StudentCard";

export const Students = () => {
    return (
        <section className="mt-20 relative z-1">
            <h2 className="text-2xl">Todos os alunos</h2>

            <div className="flex items-center gap-10 justify-center mt-10">
                <div className="bg-primary-gradient w-full max-w-100 p-0.5 rounded-lg h-11">
                    <input type="text" placeholder="Nome do aluno" className="w-full bg-slate-950 text-white p-3 h-10 rounded-md outline-none" />
                </div>
                <div className="w-10 h-10 flex justify-center items-center rounded-lg bg-primary-gradient">
                    <FaSearch />
                </div>
            </div>

            <div>
                <StudentCard/>
            </div>
        </section>
    )
}