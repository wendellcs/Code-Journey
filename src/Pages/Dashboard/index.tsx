import { Students } from "../../Components/Students"

export const Dashboard = () => {
    return (
        <main className="text-center py-15 relative overflow-clip bg-main-aurora">
            <h1 className="my-25 text-3xl">Cadastrar Aluno</h1>

            <form className="text-left flex flex-col gap-5 w-full max-w-140 mx-auto bg-form-background shadow-form rounded-3xl p-10">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input type="text" id="name" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg" placeholder="Nome do aluno"/>
                </div>

                <div>
                    <label htmlFor="surname">Sobrenome</label>
                    <input type="text" id="surname" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg" placeholder="Sobrenome do aluno"/>
                </div>

                <div>
                    <label htmlFor="class">Turma</label>
                    <select id="class" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg">
                        <option value="y-1">Young 1</option>
                        <option value="y-2">Young 2</option>
                        <option value="y-3">Young 3</option>
                        <option value="y-4">Young 4</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="module">Módulo</label>
                    <select id="module" className="w-full h-10 rounded-lg mt-2.5 pl-1.5 bg-input shadow-input backdrop-blur-lg">
                        <option value="m-1">Módulo 1</option>
                        <option value="m-2">Módulo 2</option>
                        <option value="m-3">Módulo 3</option>
                        <option value="m-4">Módulo 4</option>
                    </select>
                </div>

                <button className="mt-6 bg-input w-50 mx-auto h-10 rounded-lg">Adicionar</button>
            </form>

            <Students />
        </main>
    )
}